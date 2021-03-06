const Viz = require("viz.js").default;
const renderer = require("viz.js/full.render");

let viz = new Viz(renderer);

const STATS_POPUP_ID = "stats-popup";

global.getRenderedGraph = function getRenderedGraph(digraph) {
  return viz.renderSVGElement(digraph).catch(err => {
    viz = new Viz(renderer);
    console.error(err.stack);
  });
};

global.getJSONGraph = function getRenderedGraph(digraph) {
  return viz.renderJSONObject(digraph).catch(err => {
    viz = new Viz(renderer);
    console.error(err.stack);
  });
};

async function main({ dot, process }) {
  const root = document.body;
  const fakePopup = createStatsElement();
  const svgGraph = await getRenderedGraph(dot);
  const graphNodesMap = process.nodes;
  const graphEdgesMap = process.transitions;

  root.append(fakePopup);
  root.append(svgGraph);

  const nodes = document.getElementsByClassName("node");
  const edges = document.getElementsByClassName("edge");

  for (const node of nodes) createGraphElHandler(graphNodesMap)(node);
  for (const edge of edges) createGraphElHandler(graphEdgesMap)(edge);

  function createGraphElHandler(elMap) {
    return function handleGraphElement(el) {
      const id = el.id;
      const nodeInfo = elMap[id];

      el.addEventListener("click", function() {
        const oldPopup = document.getElementById(STATS_POPUP_ID);
        const { top, left, width } = el.getBoundingClientRect();

        const newPopup = createStatsElement();
        newPopup.innerText = JSON.stringify(nodeInfo, undefined, 2);
        newPopup.style.backgroundColor = "#eee";
        newPopup.style.color = "#123";
        newPopup.style.padding = "10px";
        newPopup.style.position = "absolute";
        newPopup.style.borderRadius = "3px";
        newPopup.style.top = window.scrollY + top + "px";
        newPopup.style.left = window.scrollX + left + width + 10 + "px";

        newPopup.addEventListener("click", function() {
          const fakePopup = createStatsElement();

          root.replaceChild(fakePopup, newPopup);
          // popup.replaceWith(fakePopup);
        });

        root.replaceChild(newPopup, oldPopup);
        // stats.replaceWith(popup);
      });
    };
  }
}

function createStatsElement() {
  const el = document.createElement("div");
  el.id = STATS_POPUP_ID;
  return el;
}

const json = {
  process: {
    schema: "http://pvm.forma-pro.com/schemas/Process.json",
    id: "749d7410-e1b0-4f27-aa35-97d09018754e",
    companyId: "12356692-eaac-4893-8e5d-9c2059fb4689",
    campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
    nodes: {
      "ad2fcc3c-ee83-40cc-9d76-cdb21d573098": {
        schema: "http://pvm.forma-pro.com/schemas/Node.json",
        id: "ad2fcc3c-ee83-40cc-9d76-cdb21d573098",
        behavior: "App\\Campaign\\Behavior\\NullBehavior",
        label: "Start Node",
        campaignNodeId: "54cc7594-f5d3-4aec-b9fe-1fd03318bcef"
      },
      "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99": {
        label: "Track Lead Event: campaign_started",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99",
        option: {
          eventId: "201e5e00-b143-4d8c-8750-0eed115792cf",
          campaignNodeId: "54cc7594-f5d3-4aec-b9fe-1fd03318bcef",
          eventName: "campaign_started"
        }
      },
      "6987eee6-de9e-43be-be87-df2b5e2fccb3": {
        label: "Send Email",
        schema: "https://www.andshift.com/schemas/Node/SendEmail.json",
        behavior: "App\\Campaign\\Behavior\\SendEmailBehavior",
        id: "6987eee6-de9e-43be-be87-df2b5e2fccb3",
        option: {
          emailTemplateId: "be4b3daf-4c4b-4839-8d49-460fb9e35dbe",
          emailId: "434d9698-52a7-4dcd-9f6a-350247d016ef"
        },
        campaignNodeId: "31b2b2e6-5901-4de5-a8cb-64ca101a9696"
      },
      "a769b5b1-4aba-46ca-880b-239ff0ec11f1": {
        label: "Track Lead Event: email_sent",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "a769b5b1-4aba-46ca-880b-239ff0ec11f1",
        option: {
          eventId: "ea6d6b9a-1485-4a9f-9656-9fd15aea4cf2",
          campaignNodeId: "31b2b2e6-5901-4de5-a8cb-64ca101a9696",
          eventName: "email_sent",
          emailTemplateId: "be4b3daf-4c4b-4839-8d49-460fb9e35dbe"
        }
      },
      "48276a72-2466-4bbd-bc1a-d2fce97f7d2f": {
        schema: "http://pvm.forma-pro.com/schemas/Node.json",
        id: "48276a72-2466-4bbd-bc1a-d2fce97f7d2f",
        behavior: "App\\Campaign\\Behavior\\NullBehavior",
        label: "Node IN",
        campaignNodeId: "3d365425-ee38-415e-89a4-2adb7d5d1210"
      },
      "c744075e-d484-4c17-8b65-90cc0700a0ed": {
        label: "Email Opened",
        schema: "https://www.andshift.com/schemas/Node/EmailOpened.json",
        behavior: "App\\Campaign\\Behavior\\EmailOpenedBehavior",
        id: "c744075e-d484-4c17-8b65-90cc0700a0ed",
        option: {
          emailTemplateId: "be4b3daf-4c4b-4839-8d49-460fb9e35dbe",
          emailId: "434d9698-52a7-4dcd-9f6a-350247d016ef"
        }
      },
      "dac11853-b391-4f22-898c-57485bc7371b": {
        label: "Decision",
        schema: "https://www.andshift.com/schemas/Node/Decision.json",
        behavior: "App\\Campaign\\Behavior\\DecisionBehavior",
        id: "dac11853-b391-4f22-898c-57485bc7371b",
        campaignNodeId: "3d365425-ee38-415e-89a4-2adb7d5d1210"
      },
      "551e3295-0979-4f36-9b0b-8e6aafe3da7d": {
        label: "Track Lead Event: email_opened",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "551e3295-0979-4f36-9b0b-8e6aafe3da7d",
        option: {
          eventId: "fa88d32a-22d2-45b4-91b1-86e750362e46",
          campaignNodeId: "3d365425-ee38-415e-89a4-2adb7d5d1210",
          eventName: "email_opened",
          points: 0
        }
      },
      "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8": {
        schema: "http://pvm.forma-pro.com/schemas/Node.json",
        id: "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8",
        behavior: "App\\Campaign\\Behavior\\NullBehavior",
        label: "Node IN",
        campaignNodeId: "632de8a3-a194-41e7-87bb-9232ee4e2ef9"
      },
      "5521d37b-7dbe-4306-ab89-056954ce3138": {
        label: "Page Visited",
        schema: "https://www.andshift.com/schemas/Node/PageVisited.json",
        behavior: "App\\Campaign\\Behavior\\PageVisitedBehavior",
        id: "5521d37b-7dbe-4306-ab89-056954ce3138",
        pageUrl: "http://collector.andshift.loc/jstracker.html"
      },
      "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e": {
        label: "Decision",
        schema: "https://www.andshift.com/schemas/Node/Decision.json",
        behavior: "App\\Campaign\\Behavior\\DecisionBehavior",
        id: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e",
        campaignNodeId: "632de8a3-a194-41e7-87bb-9232ee4e2ef9"
      },
      "6c634d99-f987-4ca5-bddd-c1f67d6f4f43": {
        label: "Adjust Lead Points",
        schema: "https://www.andshift.com/schemas/Node/AdjustLeadScore.json",
        behavior: "App\\Campaign\\Behavior\\AdjustLeadScoreBehavior",
        id: "6c634d99-f987-4ca5-bddd-c1f67d6f4f43",
        option: {
          points: 10
        }
      },
      "96e96da8-83cd-4be5-b96d-1df8c5c06aaf": {
        label: "Track Lead Event: page_visited",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "96e96da8-83cd-4be5-b96d-1df8c5c06aaf",
        option: {
          eventId: "7d539431-cb2b-4440-a69f-b8289aa21d65",
          campaignNodeId: "632de8a3-a194-41e7-87bb-9232ee4e2ef9",
          eventName: "page_visited",
          points: 10
        }
      },
      "70c21805-b330-449a-8bb1-b4695e512237": {
        schema: "http://pvm.forma-pro.com/schemas/Node.json",
        id: "70c21805-b330-449a-8bb1-b4695e512237",
        behavior: "App\\Campaign\\Behavior\\NullBehavior",
        label: "Node IN",
        campaignNodeId: "d8cba844-a429-4966-b28e-bb3505171d16"
      },
      "f91c8041-7ce1-4188-939b-74523a741440": {
        label: "Decision",
        schema: "https://www.andshift.com/schemas/Node/Decision.json",
        behavior: "App\\Campaign\\Behavior\\DecisionBehavior",
        id: "f91c8041-7ce1-4188-939b-74523a741440",
        campaignNodeId: "d8cba844-a429-4966-b28e-bb3505171d16"
      },
      "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f": {
        label: "Adjust Lead Points",
        schema: "https://www.andshift.com/schemas/Node/AdjustLeadScore.json",
        behavior: "App\\Campaign\\Behavior\\AdjustLeadScoreBehavior",
        id: "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f",
        option: {
          points: 15
        }
      },
      "3bbb9c6c-af63-47fa-b5e0-50a55965d027": {
        label: "Track Lead Event: form_submitted",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "3bbb9c6c-af63-47fa-b5e0-50a55965d027",
        option: {
          eventId: "3fc005bd-70b5-44c6-adc7-6878525382ad",
          campaignNodeId: "d8cba844-a429-4966-b28e-bb3505171d16",
          eventName: "form_submitted",
          points: 15
        }
      },
      "305941e4-6e5f-4155-be88-3fc45dcc14be": {
        label: "Form Submitted",
        schema: "https://www.andshift.com/schemas/Node/FormSubmitted.json",
        behavior: "App\\Campaign\\Behavior\\FormSubmittedBehavior",
        id: "305941e4-6e5f-4155-be88-3fc45dcc14be",
        option: {
          formId: "1d7ac2c3-e331-4141-8b55-16f2e99b04b0"
        }
      },
      "00870ce1-fa5a-4f79-9534-a72bce9b7cc2": {
        label: "Form Submitted",
        schema: "https://www.andshift.com/schemas/Node/FormSubmitted.json",
        behavior: "App\\Campaign\\Behavior\\FormSubmittedBehavior",
        id: "00870ce1-fa5a-4f79-9534-a72bce9b7cc2",
        option: {
          formId: "3cc35845-e1fd-4125-b239-78a9350a0486"
        }
      },
      "8b200471-dea2-427d-a5bc-1d31630c9e62": {
        schema: "http://pvm.forma-pro.com/schemas/Node.json",
        id: "8b200471-dea2-427d-a5bc-1d31630c9e62",
        behavior: "App\\Campaign\\Behavior\\NullBehavior",
        label: "Node IN",
        campaignNodeId: "677ebe0b-71d3-44ac-b4d4-38b14e491732"
      },
      "9afb8da2-73e0-4694-89af-b5d0f53bfbcb": {
        label: "Decision",
        schema: "https://www.andshift.com/schemas/Node/Decision.json",
        behavior: "App\\Campaign\\Behavior\\DecisionBehavior",
        id: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb",
        campaignNodeId: "677ebe0b-71d3-44ac-b4d4-38b14e491732"
      },
      "dac23075-d334-4b73-8f9f-377ca4fe116e": {
        label: "Adjust Lead Points",
        schema: "https://www.andshift.com/schemas/Node/AdjustLeadScore.json",
        behavior: "App\\Campaign\\Behavior\\AdjustLeadScoreBehavior",
        id: "dac23075-d334-4b73-8f9f-377ca4fe116e",
        option: {
          points: 15
        }
      },
      "335de7d2-2869-437f-b77e-e7e66ff96349": {
        label: "Track Lead Event: asset_downloaded",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "335de7d2-2869-437f-b77e-e7e66ff96349",
        option: {
          eventId: "64402576-3ea6-40a4-bf20-7043ded1babb",
          campaignNodeId: "677ebe0b-71d3-44ac-b4d4-38b14e491732",
          eventName: "asset_downloaded",
          points: 15
        }
      },
      "538e8c4b-f93a-4264-b3cc-bacf822c0ff2": {
        label: "Asset Downloaded",
        schema: "https://www.andshift.com/schemas/Node/AssetDownloaded.json",
        behavior: "App\\Campaign\\Behavior\\AssetDownloadedBehavior",
        id: "538e8c4b-f93a-4264-b3cc-bacf822c0ff2",
        option: {
          assetId: "35b07967-5845-4156-afe8-7b3905015c05"
        }
      },
      "e341a240-7ccb-47c1-a3bf-62ce163f9252": {
        label: "Asset Downloaded",
        schema: "https://www.andshift.com/schemas/Node/AssetDownloaded.json",
        behavior: "App\\Campaign\\Behavior\\AssetDownloadedBehavior",
        id: "e341a240-7ccb-47c1-a3bf-62ce163f9252",
        option: {
          assetId: "96523732-c4ec-4fa8-bad5-4702b398afa8"
        }
      },
      "96ade489-1612-421f-b010-fee2ee10e02f": {
        label: "Remove lead from list(s)",
        schema: "https://www.andshift.com/schemas/Node/RemoveLeadFromList.json",
        behavior: "App\\Campaign\\Behavior\\RemoveLeadFromListBehavior",
        id: "96ade489-1612-421f-b010-fee2ee10e02f",
        option: {
          listIds: ["6bf6e6b9-47f2-42a2-8127-db20af497979"]
        },
        campaignNodeId: "a08895f8-15e8-4eaf-a160-e91b8eb05bdd"
      },
      "c1d51c30-06f0-4722-bb1f-e0409022bdf9": {
        label: "Add lead to list(s)",
        schema: "https://www.andshift.com/schemas/Node/AddLeadToList.json",
        behavior: "App\\Campaign\\Behavior\\AddLeadToListBehavior",
        id: "c1d51c30-06f0-4722-bb1f-e0409022bdf9",
        option: {
          listIds: ["479c5111-04ba-4117-b6fc-b49673d05758"]
        }
      },
      "2dd8cfb2-f8ec-49aa-937b-b2f64e172815": {
        label: "Track Lead Event: lead_list_modified",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "2dd8cfb2-f8ec-49aa-937b-b2f64e172815",
        option: {
          eventId: "0751cda1-236d-425c-be1b-438a08f0a9eb",
          campaignNodeId: "a08895f8-15e8-4eaf-a160-e91b8eb05bdd",
          eventName: "lead_list_modified"
        }
      },
      "28aa4fa9-ecd0-4fac-9f60-6e2756000425": {
        label: "Send Email",
        schema: "https://www.andshift.com/schemas/Node/SendEmail.json",
        behavior: "App\\Campaign\\Behavior\\SendEmailBehavior",
        id: "28aa4fa9-ecd0-4fac-9f60-6e2756000425",
        option: {
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0",
          emailId: "b05c0fff-8409-492d-b790-9620019d07f9"
        },
        campaignNodeId: "7826d3bd-033b-415f-961c-33c7f5db5727"
      },
      "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517": {
        label: "Track Lead Event: email_sent",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517",
        option: {
          eventId: "4949360e-74d5-4aab-9160-ff13a673f0ef",
          campaignNodeId: "7826d3bd-033b-415f-961c-33c7f5db5727",
          eventName: "email_sent",
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0"
        }
      },
      "c9373a38-a325-4804-a531-4d11038d81bc": {
        label: "Send Email",
        schema: "https://www.andshift.com/schemas/Node/SendEmail.json",
        behavior: "App\\Campaign\\Behavior\\SendEmailBehavior",
        id: "c9373a38-a325-4804-a531-4d11038d81bc",
        option: {
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0",
          emailId: "82ca924e-0f9f-4391-89d6-9f91b55b9610"
        },
        campaignNodeId: "0f7141e4-73a5-4924-a6eb-8f33430e2977"
      },
      "17499840-cefe-4f5f-82c0-66481c28b3da": {
        label: "Track Lead Event: email_sent",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "17499840-cefe-4f5f-82c0-66481c28b3da",
        option: {
          eventId: "f0cea22c-65e7-4efa-8b05-d34a1528807e",
          campaignNodeId: "0f7141e4-73a5-4924-a6eb-8f33430e2977",
          eventName: "email_sent",
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0"
        }
      },
      "143e8707-8f7b-4a36-a13b-02fa63ac0fe7": {
        label: "Send Email",
        schema: "https://www.andshift.com/schemas/Node/SendEmail.json",
        behavior: "App\\Campaign\\Behavior\\SendEmailBehavior",
        id: "143e8707-8f7b-4a36-a13b-02fa63ac0fe7",
        option: {
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0",
          emailId: "b2f34d66-65a0-4c00-b722-6fd5442745bf"
        },
        campaignNodeId: "e5572b9a-77c5-424a-8000-b414fd8e8d70"
      },
      "3e286e68-6c4a-4418-a8c2-046622dd84ce": {
        label: "Track Lead Event: email_sent",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "3e286e68-6c4a-4418-a8c2-046622dd84ce",
        option: {
          eventId: "f0568760-71df-4345-beda-c4cf3add9935",
          campaignNodeId: "e5572b9a-77c5-424a-8000-b414fd8e8d70",
          eventName: "email_sent",
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0"
        }
      },
      "033160a7-680d-4c8d-92be-419782f3bd83": {
        label: "Send Email",
        schema: "https://www.andshift.com/schemas/Node/SendEmail.json",
        behavior: "App\\Campaign\\Behavior\\SendEmailBehavior",
        id: "033160a7-680d-4c8d-92be-419782f3bd83",
        option: {
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0",
          emailId: "551ca060-2122-4f65-8c61-e792c854faf3"
        },
        campaignNodeId: "56b03d70-00d8-48c1-922d-6f61ac6f75e1"
      },
      "dd621ba2-f338-472d-82a0-7b2037becb37": {
        label: "Track Lead Event: email_sent",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "dd621ba2-f338-472d-82a0-7b2037becb37",
        option: {
          eventId: "3f2e2097-516a-43e3-a3ab-5b204d1885bf",
          campaignNodeId: "56b03d70-00d8-48c1-922d-6f61ac6f75e1",
          eventName: "email_sent",
          emailTemplateId: "018abed4-009d-477d-8d69-f1b0fcc9bff0"
        }
      },
      "53fb927b-6927-459a-8d8f-d39f11adf94b": {
        label: "Wait",
        schema: "https://www.andshift.com/schemas/Node/Wait.json",
        behavior: "App\\Campaign\\Behavior\\WaitBehavior",
        id: "53fb927b-6927-459a-8d8f-d39f11adf94b",
        option: {
          durationType: "relative_period",
          durationTime: 60
        }
      },
      "40485193-be2a-4bc0-a579-087014bb9de4": {
        label: "Wait",
        schema: "https://www.andshift.com/schemas/Node/Wait.json",
        behavior: "App\\Campaign\\Behavior\\WaitBehavior",
        id: "40485193-be2a-4bc0-a579-087014bb9de4",
        option: {
          durationType: "relative_period",
          durationTime: 60
        }
      },
      "b1922840-e3fe-4206-9396-731be17b8af3": {
        label: "Wait",
        schema: "https://www.andshift.com/schemas/Node/Wait.json",
        behavior: "App\\Campaign\\Behavior\\WaitBehavior",
        id: "b1922840-e3fe-4206-9396-731be17b8af3",
        option: {
          durationType: "relative_period",
          durationTime: 60
        }
      },
      "22fef1e6-106e-4f23-8de7-3723c5fdbe70": {
        label: "Wait",
        schema: "https://www.andshift.com/schemas/Node/Wait.json",
        behavior: "App\\Campaign\\Behavior\\WaitBehavior",
        id: "22fef1e6-106e-4f23-8de7-3723c5fdbe70",
        option: {
          durationType: "relative_period",
          durationTime: 60
        }
      },
      "23b54395-8336-49eb-a6f2-240e7adbc832": {
        label: "All paths finished",
        schema:
          "https://www.andshift.com/schemas/Node/AllCampaignPathsFinished.json",
        behavior: "App\\Campaign\\Behavior\\AllCampaignPathsFinishedBehavior",
        id: "23b54395-8336-49eb-a6f2-240e7adbc832",
        option: {
          pathIds: [
            "31b2b2e6-5901-4de5-a8cb-64ca101a9696",
            "632de8a3-a194-41e7-87bb-9232ee4e2ef9",
            "d8cba844-a429-4966-b28e-bb3505171d16",
            "677ebe0b-71d3-44ac-b4d4-38b14e491732"
          ]
        }
      },
      "5063a655-c32d-4def-af53-f2c29fd89fd7": {
        label: "Track Lead Event: campaign_finished",
        schema:
          "https://www.andshift.com/schemas/Node/TrackCampaignLeadEvent.json",
        behavior: "App\\Campaign\\Behavior\\TrackCampaignLeadEventBehavior",
        id: "5063a655-c32d-4def-af53-f2c29fd89fd7",
        option: {
          eventId: "10fe2d96-96e9-448d-921f-433e9d3d37ab",
          campaignNodeId: "54cc7594-f5d3-4aec-b9fe-1fd03318bcef",
          eventName: "campaign_finished"
        }
      }
    },
    transitions: {
      "0405ac4b-79b2-401e-b34f-1bdc61ffa029": {
        id: "0405ac4b-79b2-401e-b34f-1bdc61ffa029",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        to: "ad2fcc3c-ee83-40cc-9d76-cdb21d573098"
      },
      "d7da5210-7e82-4469-9c93-c8652e0fcffa": {
        id: "d7da5210-7e82-4469-9c93-c8652e0fcffa",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        to: "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99"
      },
      "c80a5d41-e486-4189-82f8-23f1faaee6cd": {
        id: "c80a5d41-e486-4189-82f8-23f1faaee6cd",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "6987eee6-de9e-43be-be87-df2b5e2fccb3",
        to: "a769b5b1-4aba-46ca-880b-239ff0ec11f1"
      },
      "a9c207d9-6d59-4d55-b2a5-505b9ff85260": {
        id: "a9c207d9-6d59-4d55-b2a5-505b9ff85260",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "48276a72-2466-4bbd-bc1a-d2fce97f7d2f",
        to: "c744075e-d484-4c17-8b65-90cc0700a0ed"
      },
      "b49ed6d2-d3f7-4e64-b010-e273821c7275": {
        id: "b49ed6d2-d3f7-4e64-b010-e273821c7275",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "c744075e-d484-4c17-8b65-90cc0700a0ed",
        to: "dac11853-b391-4f22-898c-57485bc7371b"
      },
      "7d0e72d8-7c15-4b95-9418-f511e21a1fee": {
        id: "7d0e72d8-7c15-4b95-9418-f511e21a1fee",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "dac11853-b391-4f22-898c-57485bc7371b",
        to: "551e3295-0979-4f36-9b0b-8e6aafe3da7d"
      },
      "87f8c48b-da70-49c2-9e6d-e2db5e5de64c": {
        id: "87f8c48b-da70-49c2-9e6d-e2db5e5de64c",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8",
        to: "5521d37b-7dbe-4306-ab89-056954ce3138"
      },
      "a35697fc-957b-4ad1-840e-9dd71276cb87": {
        id: "a35697fc-957b-4ad1-840e-9dd71276cb87",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "5521d37b-7dbe-4306-ab89-056954ce3138",
        to: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e"
      },
      "90950378-4710-4651-aa3b-e370825cfc1f": {
        id: "90950378-4710-4651-aa3b-e370825cfc1f",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e",
        to: "6c634d99-f987-4ca5-bddd-c1f67d6f4f43"
      },
      "383b9225-2e35-449f-8681-fea3c8e26c01": {
        id: "383b9225-2e35-449f-8681-fea3c8e26c01",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e",
        to: "96e96da8-83cd-4be5-b96d-1df8c5c06aaf"
      },
      "ba0103c9-ed6c-4dfb-a431-0d01dcde8ee7": {
        id: "ba0103c9-ed6c-4dfb-a431-0d01dcde8ee7",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "f91c8041-7ce1-4188-939b-74523a741440",
        to: "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f"
      },
      "c708b971-2e09-46e1-addc-237d01a5539c": {
        id: "c708b971-2e09-46e1-addc-237d01a5539c",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "f91c8041-7ce1-4188-939b-74523a741440",
        to: "3bbb9c6c-af63-47fa-b5e0-50a55965d027"
      },
      "eef90408-ed7c-4c85-93e0-91b4e4f7cdcb": {
        id: "eef90408-ed7c-4c85-93e0-91b4e4f7cdcb",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "70c21805-b330-449a-8bb1-b4695e512237",
        to: "305941e4-6e5f-4155-be88-3fc45dcc14be"
      },
      "c9d455f2-7017-4439-b69c-d90fc7ac8bba": {
        id: "c9d455f2-7017-4439-b69c-d90fc7ac8bba",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "305941e4-6e5f-4155-be88-3fc45dcc14be",
        to: "f91c8041-7ce1-4188-939b-74523a741440"
      },
      "f57ae887-f2c0-4e92-adfd-f51564eea7c1": {
        id: "f57ae887-f2c0-4e92-adfd-f51564eea7c1",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "70c21805-b330-449a-8bb1-b4695e512237",
        to: "00870ce1-fa5a-4f79-9534-a72bce9b7cc2"
      },
      "3616f1a9-b73d-4928-b073-9387f480ca6b": {
        id: "3616f1a9-b73d-4928-b073-9387f480ca6b",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "00870ce1-fa5a-4f79-9534-a72bce9b7cc2",
        to: "f91c8041-7ce1-4188-939b-74523a741440"
      },
      "dce257d5-c2f6-46ca-98b6-5e817ccce99e": {
        id: "dce257d5-c2f6-46ca-98b6-5e817ccce99e",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb",
        to: "dac23075-d334-4b73-8f9f-377ca4fe116e"
      },
      "e03a6b4f-743c-403c-9087-6509d93e2ed3": {
        id: "e03a6b4f-743c-403c-9087-6509d93e2ed3",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb",
        to: "335de7d2-2869-437f-b77e-e7e66ff96349"
      },
      "219833bf-f0e5-47e7-b82d-b77310ee3445": {
        id: "219833bf-f0e5-47e7-b82d-b77310ee3445",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "8b200471-dea2-427d-a5bc-1d31630c9e62",
        to: "538e8c4b-f93a-4264-b3cc-bacf822c0ff2"
      },
      "80d1b6c2-8e66-48d8-be97-fe97c3ddc503": {
        id: "80d1b6c2-8e66-48d8-be97-fe97c3ddc503",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "538e8c4b-f93a-4264-b3cc-bacf822c0ff2",
        to: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb"
      },
      "1387466d-19ad-472a-a68f-733d59fc4154": {
        id: "1387466d-19ad-472a-a68f-733d59fc4154",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "8b200471-dea2-427d-a5bc-1d31630c9e62",
        to: "e341a240-7ccb-47c1-a3bf-62ce163f9252"
      },
      "b593942b-83dc-4fba-b54b-d442ff8cb0ad": {
        id: "b593942b-83dc-4fba-b54b-d442ff8cb0ad",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "e341a240-7ccb-47c1-a3bf-62ce163f9252",
        to: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb"
      },
      "48cbc303-3c2a-4345-abcf-85a7b719db0e": {
        id: "48cbc303-3c2a-4345-abcf-85a7b719db0e",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "96ade489-1612-421f-b010-fee2ee10e02f",
        to: "c1d51c30-06f0-4722-bb1f-e0409022bdf9"
      },
      "b6bb4471-f9e1-40ab-8919-9da9121c2de9": {
        id: "b6bb4471-f9e1-40ab-8919-9da9121c2de9",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "96ade489-1612-421f-b010-fee2ee10e02f",
        to: "2dd8cfb2-f8ec-49aa-937b-b2f64e172815"
      },
      "02f883b7-7852-43e8-8e44-45d2cf58c070": {
        id: "02f883b7-7852-43e8-8e44-45d2cf58c070",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "28aa4fa9-ecd0-4fac-9f60-6e2756000425",
        to: "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517"
      },
      "c2939650-f487-4973-9d0b-2ab8bb1f40e9": {
        id: "c2939650-f487-4973-9d0b-2ab8bb1f40e9",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "c9373a38-a325-4804-a531-4d11038d81bc",
        to: "17499840-cefe-4f5f-82c0-66481c28b3da"
      },
      "05770158-8cca-4e47-ae81-aa40c20f9e7b": {
        id: "05770158-8cca-4e47-ae81-aa40c20f9e7b",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "143e8707-8f7b-4a36-a13b-02fa63ac0fe7",
        to: "3e286e68-6c4a-4418-a8c2-046622dd84ce"
      },
      "a57d4d67-6bce-405f-9507-4091c68a1ba6": {
        id: "a57d4d67-6bce-405f-9507-4091c68a1ba6",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "033160a7-680d-4c8d-92be-419782f3bd83",
        to: "dd621ba2-f338-472d-82a0-7b2037becb37"
      },
      "079f7aba-12fe-4bee-9566-e335577b55af": {
        id: "079f7aba-12fe-4bee-9566-e335577b55af",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "ad2fcc3c-ee83-40cc-9d76-cdb21d573098",
        to: "6987eee6-de9e-43be-be87-df2b5e2fccb3"
      },
      "3576fa90-ccb8-4f62-9a69-579a028f88be": {
        id: "3576fa90-ccb8-4f62-9a69-579a028f88be",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "ad2fcc3c-ee83-40cc-9d76-cdb21d573098",
        to: "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8"
      },
      "29fcd91f-d04b-48cf-8246-ed2881668d81": {
        id: "29fcd91f-d04b-48cf-8246-ed2881668d81",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "ad2fcc3c-ee83-40cc-9d76-cdb21d573098",
        to: "70c21805-b330-449a-8bb1-b4695e512237"
      },
      "eb2e9638-6d59-49f4-b560-256dbb92baae": {
        id: "eb2e9638-6d59-49f4-b560-256dbb92baae",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "ad2fcc3c-ee83-40cc-9d76-cdb21d573098",
        to: "8b200471-dea2-427d-a5bc-1d31630c9e62"
      },
      "986c9be9-de9b-4737-92f3-860c07271b5e": {
        id: "986c9be9-de9b-4737-92f3-860c07271b5e",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "6987eee6-de9e-43be-be87-df2b5e2fccb3",
        to: "48276a72-2466-4bbd-bc1a-d2fce97f7d2f"
      },
      "7e261a31-622c-42a1-a387-8516ba3f099b": {
        id: "7e261a31-622c-42a1-a387-8516ba3f099b",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb",
        to: "96ade489-1612-421f-b010-fee2ee10e02f"
      },
      "f6304050-b1d0-4de7-a914-bb7fa3d57d98": {
        id: "f6304050-b1d0-4de7-a914-bb7fa3d57d98",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "48276a72-2466-4bbd-bc1a-d2fce97f7d2f",
        to: "53fb927b-6927-459a-8d8f-d39f11adf94b"
      },
      "137786c9-5b2d-45bb-80ed-c77279f8a124": {
        id: "137786c9-5b2d-45bb-80ed-c77279f8a124",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "53fb927b-6927-459a-8d8f-d39f11adf94b",
        to: "dac11853-b391-4f22-898c-57485bc7371b"
      },
      "3d68765c-004f-4a70-bfa8-ee80d962e713": {
        id: "3d68765c-004f-4a70-bfa8-ee80d962e713",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "fail",
        from: "dac11853-b391-4f22-898c-57485bc7371b",
        to: "28aa4fa9-ecd0-4fac-9f60-6e2756000425"
      },
      "9a700904-af5f-47cd-989a-578bb11ef97a": {
        id: "9a700904-af5f-47cd-989a-578bb11ef97a",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8",
        to: "40485193-be2a-4bc0-a579-087014bb9de4"
      },
      "767a6e09-13ab-49e4-a30a-000702beab49": {
        id: "767a6e09-13ab-49e4-a30a-000702beab49",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "40485193-be2a-4bc0-a579-087014bb9de4",
        to: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e"
      },
      "a377d651-3227-4ab2-a8c3-39f15cc677bd": {
        id: "a377d651-3227-4ab2-a8c3-39f15cc677bd",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "fail",
        from: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e",
        to: "c9373a38-a325-4804-a531-4d11038d81bc"
      },
      "f01dbe04-acbb-4cc4-9e84-93e04ffe8119": {
        id: "f01dbe04-acbb-4cc4-9e84-93e04ffe8119",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "70c21805-b330-449a-8bb1-b4695e512237",
        to: "b1922840-e3fe-4206-9396-731be17b8af3"
      },
      "4d917999-a651-4053-956b-af54cb672ac1": {
        id: "4d917999-a651-4053-956b-af54cb672ac1",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "b1922840-e3fe-4206-9396-731be17b8af3",
        to: "f91c8041-7ce1-4188-939b-74523a741440"
      },
      "bf9a31c5-1195-4e71-abd5-4ff9e915d7c3": {
        id: "bf9a31c5-1195-4e71-abd5-4ff9e915d7c3",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "fail",
        from: "f91c8041-7ce1-4188-939b-74523a741440",
        to: "143e8707-8f7b-4a36-a13b-02fa63ac0fe7"
      },
      "0f418de2-3fbf-4b4b-8a3d-25fee25801d8": {
        id: "0f418de2-3fbf-4b4b-8a3d-25fee25801d8",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "8b200471-dea2-427d-a5bc-1d31630c9e62",
        to: "22fef1e6-106e-4f23-8de7-3723c5fdbe70"
      },
      "9d6942b8-f08a-4cc3-abff-94e2c6641642": {
        id: "9d6942b8-f08a-4cc3-abff-94e2c6641642",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "22fef1e6-106e-4f23-8de7-3723c5fdbe70",
        to: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb"
      },
      "6d8d3fe5-881f-48ac-997b-e120777cbfc4": {
        id: "6d8d3fe5-881f-48ac-997b-e120777cbfc4",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "fail",
        from: "9afb8da2-73e0-4694-89af-b5d0f53bfbcb",
        to: "033160a7-680d-4c8d-92be-419782f3bd83"
      },
      "28b29a46-fb34-4e90-a1bc-a6ca7baf23fa": {
        id: "28b29a46-fb34-4e90-a1bc-a6ca7baf23fa",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "23b54395-8336-49eb-a6f2-240e7adbc832",
        to: "5063a655-c32d-4def-af53-f2c29fd89fd7"
      },
      "f782bdb5-7685-40eb-ba52-85c1df5a79ab": {
        id: "f782bdb5-7685-40eb-ba52-85c1df5a79ab",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "dac11853-b391-4f22-898c-57485bc7371b",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "31b2b2e6-5901-4de5-a8cb-64ca101a9696"
      },
      "b36e8617-f09a-4836-860a-a67489a7c4e2": {
        id: "b36e8617-f09a-4836-860a-a67489a7c4e2",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "28aa4fa9-ecd0-4fac-9f60-6e2756000425",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "31b2b2e6-5901-4de5-a8cb-64ca101a9696"
      },
      "3f1f7edb-87fd-4e44-919b-a0f9d563339e": {
        id: "3f1f7edb-87fd-4e44-919b-a0f9d563339e",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "632de8a3-a194-41e7-87bb-9232ee4e2ef9"
      },
      "19dab2a3-b5ad-4202-8ea9-effc68819a84": {
        id: "19dab2a3-b5ad-4202-8ea9-effc68819a84",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "c9373a38-a325-4804-a531-4d11038d81bc",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "632de8a3-a194-41e7-87bb-9232ee4e2ef9"
      },
      "e02867af-a8c2-436c-8d8e-5078a5a76a53": {
        id: "e02867af-a8c2-436c-8d8e-5078a5a76a53",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        name: "success",
        from: "f91c8041-7ce1-4188-939b-74523a741440",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "d8cba844-a429-4966-b28e-bb3505171d16"
      },
      "f4bcba2b-04c9-4ceb-ada2-2cda9238bb95": {
        id: "f4bcba2b-04c9-4ceb-ada2-2cda9238bb95",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "143e8707-8f7b-4a36-a13b-02fa63ac0fe7",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "d8cba844-a429-4966-b28e-bb3505171d16"
      },
      "61866d6d-d590-4381-8ebf-2e203085d256": {
        id: "61866d6d-d590-4381-8ebf-2e203085d256",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "96ade489-1612-421f-b010-fee2ee10e02f",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "677ebe0b-71d3-44ac-b4d4-38b14e491732"
      },
      "2699fb31-9081-444a-954f-d4f7d09df241": {
        id: "2699fb31-9081-444a-954f-d4f7d09df241",
        weight: 1,
        async: false,
        active: true,
        schema: "http://pvm.forma-pro.com/schemas/Transition.json",
        from: "033160a7-680d-4c8d-92be-419782f3bd83",
        to: "23b54395-8336-49eb-a6f2-240e7adbc832",
        pathId: "677ebe0b-71d3-44ac-b4d4-38b14e491732"
      }
    },
    inTransitions: {
      "ad2fcc3c-ee83-40cc-9d76-cdb21d573098": [
        "0405ac4b-79b2-401e-b34f-1bdc61ffa029"
      ],
      "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99": [
        "d7da5210-7e82-4469-9c93-c8652e0fcffa"
      ],
      "a769b5b1-4aba-46ca-880b-239ff0ec11f1": [
        "c80a5d41-e486-4189-82f8-23f1faaee6cd"
      ],
      "c744075e-d484-4c17-8b65-90cc0700a0ed": [
        "a9c207d9-6d59-4d55-b2a5-505b9ff85260"
      ],
      "dac11853-b391-4f22-898c-57485bc7371b": [
        "b49ed6d2-d3f7-4e64-b010-e273821c7275",
        "137786c9-5b2d-45bb-80ed-c77279f8a124"
      ],
      "551e3295-0979-4f36-9b0b-8e6aafe3da7d": [
        "7d0e72d8-7c15-4b95-9418-f511e21a1fee"
      ],
      "5521d37b-7dbe-4306-ab89-056954ce3138": [
        "87f8c48b-da70-49c2-9e6d-e2db5e5de64c"
      ],
      "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e": [
        "a35697fc-957b-4ad1-840e-9dd71276cb87",
        "767a6e09-13ab-49e4-a30a-000702beab49"
      ],
      "6c634d99-f987-4ca5-bddd-c1f67d6f4f43": [
        "90950378-4710-4651-aa3b-e370825cfc1f"
      ],
      "96e96da8-83cd-4be5-b96d-1df8c5c06aaf": [
        "383b9225-2e35-449f-8681-fea3c8e26c01"
      ],
      "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f": [
        "ba0103c9-ed6c-4dfb-a431-0d01dcde8ee7"
      ],
      "3bbb9c6c-af63-47fa-b5e0-50a55965d027": [
        "c708b971-2e09-46e1-addc-237d01a5539c"
      ],
      "305941e4-6e5f-4155-be88-3fc45dcc14be": [
        "eef90408-ed7c-4c85-93e0-91b4e4f7cdcb"
      ],
      "f91c8041-7ce1-4188-939b-74523a741440": [
        "c9d455f2-7017-4439-b69c-d90fc7ac8bba",
        "3616f1a9-b73d-4928-b073-9387f480ca6b",
        "4d917999-a651-4053-956b-af54cb672ac1"
      ],
      "00870ce1-fa5a-4f79-9534-a72bce9b7cc2": [
        "f57ae887-f2c0-4e92-adfd-f51564eea7c1"
      ],
      "dac23075-d334-4b73-8f9f-377ca4fe116e": [
        "dce257d5-c2f6-46ca-98b6-5e817ccce99e"
      ],
      "335de7d2-2869-437f-b77e-e7e66ff96349": [
        "e03a6b4f-743c-403c-9087-6509d93e2ed3"
      ],
      "538e8c4b-f93a-4264-b3cc-bacf822c0ff2": [
        "219833bf-f0e5-47e7-b82d-b77310ee3445"
      ],
      "9afb8da2-73e0-4694-89af-b5d0f53bfbcb": [
        "80d1b6c2-8e66-48d8-be97-fe97c3ddc503",
        "b593942b-83dc-4fba-b54b-d442ff8cb0ad",
        "9d6942b8-f08a-4cc3-abff-94e2c6641642"
      ],
      "e341a240-7ccb-47c1-a3bf-62ce163f9252": [
        "1387466d-19ad-472a-a68f-733d59fc4154"
      ],
      "c1d51c30-06f0-4722-bb1f-e0409022bdf9": [
        "48cbc303-3c2a-4345-abcf-85a7b719db0e"
      ],
      "2dd8cfb2-f8ec-49aa-937b-b2f64e172815": [
        "b6bb4471-f9e1-40ab-8919-9da9121c2de9"
      ],
      "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517": [
        "02f883b7-7852-43e8-8e44-45d2cf58c070"
      ],
      "17499840-cefe-4f5f-82c0-66481c28b3da": [
        "c2939650-f487-4973-9d0b-2ab8bb1f40e9"
      ],
      "3e286e68-6c4a-4418-a8c2-046622dd84ce": [
        "05770158-8cca-4e47-ae81-aa40c20f9e7b"
      ],
      "dd621ba2-f338-472d-82a0-7b2037becb37": [
        "a57d4d67-6bce-405f-9507-4091c68a1ba6"
      ],
      "6987eee6-de9e-43be-be87-df2b5e2fccb3": [
        "079f7aba-12fe-4bee-9566-e335577b55af"
      ],
      "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8": [
        "3576fa90-ccb8-4f62-9a69-579a028f88be"
      ],
      "70c21805-b330-449a-8bb1-b4695e512237": [
        "29fcd91f-d04b-48cf-8246-ed2881668d81"
      ],
      "8b200471-dea2-427d-a5bc-1d31630c9e62": [
        "eb2e9638-6d59-49f4-b560-256dbb92baae"
      ],
      "48276a72-2466-4bbd-bc1a-d2fce97f7d2f": [
        "986c9be9-de9b-4737-92f3-860c07271b5e"
      ],
      "96ade489-1612-421f-b010-fee2ee10e02f": [
        "7e261a31-622c-42a1-a387-8516ba3f099b"
      ],
      "53fb927b-6927-459a-8d8f-d39f11adf94b": [
        "f6304050-b1d0-4de7-a914-bb7fa3d57d98"
      ],
      "28aa4fa9-ecd0-4fac-9f60-6e2756000425": [
        "3d68765c-004f-4a70-bfa8-ee80d962e713"
      ],
      "40485193-be2a-4bc0-a579-087014bb9de4": [
        "9a700904-af5f-47cd-989a-578bb11ef97a"
      ],
      "c9373a38-a325-4804-a531-4d11038d81bc": [
        "a377d651-3227-4ab2-a8c3-39f15cc677bd"
      ],
      "b1922840-e3fe-4206-9396-731be17b8af3": [
        "f01dbe04-acbb-4cc4-9e84-93e04ffe8119"
      ],
      "143e8707-8f7b-4a36-a13b-02fa63ac0fe7": [
        "bf9a31c5-1195-4e71-abd5-4ff9e915d7c3"
      ],
      "22fef1e6-106e-4f23-8de7-3723c5fdbe70": [
        "0f418de2-3fbf-4b4b-8a3d-25fee25801d8"
      ],
      "033160a7-680d-4c8d-92be-419782f3bd83": [
        "6d8d3fe5-881f-48ac-997b-e120777cbfc4"
      ],
      "5063a655-c32d-4def-af53-f2c29fd89fd7": [
        "28b29a46-fb34-4e90-a1bc-a6ca7baf23fa"
      ],
      "23b54395-8336-49eb-a6f2-240e7adbc832": [
        "f782bdb5-7685-40eb-ba52-85c1df5a79ab",
        "b36e8617-f09a-4836-860a-a67489a7c4e2",
        "3f1f7edb-87fd-4e44-919b-a0f9d563339e",
        "19dab2a3-b5ad-4202-8ea9-effc68819a84",
        "e02867af-a8c2-436c-8d8e-5078a5a76a53",
        "f4bcba2b-04c9-4ceb-ada2-2cda9238bb95",
        "61866d6d-d590-4381-8ebf-2e203085d256",
        "2699fb31-9081-444a-954f-d4f7d09df241"
      ]
    },
    outTransitions: {
      "6987eee6-de9e-43be-be87-df2b5e2fccb3": [
        "c80a5d41-e486-4189-82f8-23f1faaee6cd",
        "986c9be9-de9b-4737-92f3-860c07271b5e"
      ],
      "48276a72-2466-4bbd-bc1a-d2fce97f7d2f": [
        "a9c207d9-6d59-4d55-b2a5-505b9ff85260",
        "f6304050-b1d0-4de7-a914-bb7fa3d57d98"
      ],
      "c744075e-d484-4c17-8b65-90cc0700a0ed": [
        "b49ed6d2-d3f7-4e64-b010-e273821c7275"
      ],
      "dac11853-b391-4f22-898c-57485bc7371b": [
        "7d0e72d8-7c15-4b95-9418-f511e21a1fee",
        "3d68765c-004f-4a70-bfa8-ee80d962e713",
        "f782bdb5-7685-40eb-ba52-85c1df5a79ab"
      ],
      "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8": [
        "87f8c48b-da70-49c2-9e6d-e2db5e5de64c",
        "9a700904-af5f-47cd-989a-578bb11ef97a"
      ],
      "5521d37b-7dbe-4306-ab89-056954ce3138": [
        "a35697fc-957b-4ad1-840e-9dd71276cb87"
      ],
      "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e": [
        "90950378-4710-4651-aa3b-e370825cfc1f",
        "383b9225-2e35-449f-8681-fea3c8e26c01",
        "a377d651-3227-4ab2-a8c3-39f15cc677bd",
        "3f1f7edb-87fd-4e44-919b-a0f9d563339e"
      ],
      "f91c8041-7ce1-4188-939b-74523a741440": [
        "ba0103c9-ed6c-4dfb-a431-0d01dcde8ee7",
        "c708b971-2e09-46e1-addc-237d01a5539c",
        "bf9a31c5-1195-4e71-abd5-4ff9e915d7c3",
        "e02867af-a8c2-436c-8d8e-5078a5a76a53"
      ],
      "70c21805-b330-449a-8bb1-b4695e512237": [
        "eef90408-ed7c-4c85-93e0-91b4e4f7cdcb",
        "f57ae887-f2c0-4e92-adfd-f51564eea7c1",
        "f01dbe04-acbb-4cc4-9e84-93e04ffe8119"
      ],
      "305941e4-6e5f-4155-be88-3fc45dcc14be": [
        "c9d455f2-7017-4439-b69c-d90fc7ac8bba"
      ],
      "00870ce1-fa5a-4f79-9534-a72bce9b7cc2": [
        "3616f1a9-b73d-4928-b073-9387f480ca6b"
      ],
      "9afb8da2-73e0-4694-89af-b5d0f53bfbcb": [
        "dce257d5-c2f6-46ca-98b6-5e817ccce99e",
        "e03a6b4f-743c-403c-9087-6509d93e2ed3",
        "7e261a31-622c-42a1-a387-8516ba3f099b",
        "6d8d3fe5-881f-48ac-997b-e120777cbfc4"
      ],
      "8b200471-dea2-427d-a5bc-1d31630c9e62": [
        "219833bf-f0e5-47e7-b82d-b77310ee3445",
        "1387466d-19ad-472a-a68f-733d59fc4154",
        "0f418de2-3fbf-4b4b-8a3d-25fee25801d8"
      ],
      "538e8c4b-f93a-4264-b3cc-bacf822c0ff2": [
        "80d1b6c2-8e66-48d8-be97-fe97c3ddc503"
      ],
      "e341a240-7ccb-47c1-a3bf-62ce163f9252": [
        "b593942b-83dc-4fba-b54b-d442ff8cb0ad"
      ],
      "96ade489-1612-421f-b010-fee2ee10e02f": [
        "48cbc303-3c2a-4345-abcf-85a7b719db0e",
        "b6bb4471-f9e1-40ab-8919-9da9121c2de9",
        "61866d6d-d590-4381-8ebf-2e203085d256"
      ],
      "28aa4fa9-ecd0-4fac-9f60-6e2756000425": [
        "02f883b7-7852-43e8-8e44-45d2cf58c070",
        "b36e8617-f09a-4836-860a-a67489a7c4e2"
      ],
      "c9373a38-a325-4804-a531-4d11038d81bc": [
        "c2939650-f487-4973-9d0b-2ab8bb1f40e9",
        "19dab2a3-b5ad-4202-8ea9-effc68819a84"
      ],
      "143e8707-8f7b-4a36-a13b-02fa63ac0fe7": [
        "05770158-8cca-4e47-ae81-aa40c20f9e7b",
        "f4bcba2b-04c9-4ceb-ada2-2cda9238bb95"
      ],
      "033160a7-680d-4c8d-92be-419782f3bd83": [
        "a57d4d67-6bce-405f-9507-4091c68a1ba6",
        "2699fb31-9081-444a-954f-d4f7d09df241"
      ],
      "ad2fcc3c-ee83-40cc-9d76-cdb21d573098": [
        "079f7aba-12fe-4bee-9566-e335577b55af",
        "3576fa90-ccb8-4f62-9a69-579a028f88be",
        "29fcd91f-d04b-48cf-8246-ed2881668d81",
        "eb2e9638-6d59-49f4-b560-256dbb92baae"
      ],
      "53fb927b-6927-459a-8d8f-d39f11adf94b": [
        "137786c9-5b2d-45bb-80ed-c77279f8a124"
      ],
      "40485193-be2a-4bc0-a579-087014bb9de4": [
        "767a6e09-13ab-49e4-a30a-000702beab49"
      ],
      "b1922840-e3fe-4206-9396-731be17b8af3": [
        "4d917999-a651-4053-956b-af54cb672ac1"
      ],
      "22fef1e6-106e-4f23-8de7-3723c5fdbe70": [
        "9d6942b8-f08a-4cc3-abff-94e2c6641642"
      ],
      "23b54395-8336-49eb-a6f2-240e7adbc832": [
        "28b29a46-fb34-4e90-a1bc-a6ca7baf23fa"
      ]
    }
  },
  tokens: [
    {
      schema: "https://www.andshift.com/schemas/PvmToken.json",
      id: "edddc1eb-3a10-4b97-a38c-28251888e4c7",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "b682319a-d37a-4ce9-9f86-0e40c5baff51",
          transitionId: "0405ac4b-79b2-401e-b34f-1bdc61ffa029",
          weight: 1,
          state: "opened",
          time: 15318088335945
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "1636b3f1-6190-4b89-b02c-c8c173b01c49",
          transitionId: "c80a5d41-e486-4189-82f8-23f1faaee6cd",
          weight: 1,
          state: "passed",
          time: 15318088363063
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "def2d1ca-dc18-40c0-8858-731aaaeb73f8",
          transitionId: "c80a5d41-e486-4189-82f8-23f1faaee6cd",
          weight: 1,
          state: "opened",
          time: 15318088363035
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "047c968b-6f6b-489f-bd5f-d79e2d19fc7e",
          transitionId: "079f7aba-12fe-4bee-9566-e335577b55af",
          weight: 1,
          state: "passed",
          time: 15318088363026
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "f5c30e1e-7c79-4ffe-98fb-f594952c1cb2",
          transitionId: "079f7aba-12fe-4bee-9566-e335577b55af",
          weight: 1,
          state: "opened",
          time: 15318088342397
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "c7808558-1135-4dc0-b141-d4d304341f28",
          transitionId: "0405ac4b-79b2-401e-b34f-1bdc61ffa029",
          weight: 1,
          state: "passed",
          time: 15318088342375
        }
      ]
    },
    {
      schema: "https://www.andshift.com/schemas/PvmToken.json",
      id: "cccb9137-3654-46ef-99c2-adf19bd04422",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "2795b29c-5ec9-45b8-949e-4e47054ca22b",
          transitionId: "d7da5210-7e82-4469-9c93-c8652e0fcffa",
          weight: 1,
          state: "opened",
          time: 15318088336089
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "dd090451-e856-43e3-9fd5-12f96929c242",
          transitionId: "d7da5210-7e82-4469-9c93-c8652e0fcffa",
          weight: 1,
          state: "passed",
          time: 15318088343412
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "ca70ab4f-d68f-4e03-ab67-4c1ab4970dcb",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "edddc1eb-3a10-4b97-a38c-28251888e4c7",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "87ca1e75-8ee1-4b15-b3b0-423d86551b90",
          transitionId: "986c9be9-de9b-4737-92f3-860c07271b5e",
          weight: 1,
          state: "opened",
          time: 15318088363103
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "ce0692f6-fc1e-46a1-87e5-736d02d9dbfd",
          transitionId: "986c9be9-de9b-4737-92f3-860c07271b5e",
          weight: 1,
          state: "passed",
          time: 15318088363107
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "aa8308bd-5268-4d14-846a-719c632c30bd",
          transitionId: "a9c207d9-6d59-4d55-b2a5-505b9ff85260",
          weight: 1,
          state: "opened",
          time: 15318088363112
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "bd5c2be9-b2cd-4266-83f9-b7becbcfacb5",
          transitionId: "a9c207d9-6d59-4d55-b2a5-505b9ff85260",
          weight: 1,
          state: "waiting",
          time: 15318088363186,
          reason: ""
        }
      ],
      waitFor: "434d9698-52a7-4dcd-9f6a-350247d016ef"
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "23ad086c-e96e-4051-bfe2-2f8ffc7d9b53",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "ca70ab4f-d68f-4e03-ab67-4c1ab4970dcb",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "bb523fb1-a631-428a-9416-5b55f08efead",
          transitionId: "f6304050-b1d0-4de7-a914-bb7fa3d57d98",
          weight: 1,
          state: "opened",
          time: 15318088363240
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "36ec40cc-a82a-4193-beea-b3d0085febf6",
          transitionId: "f6304050-b1d0-4de7-a914-bb7fa3d57d98",
          weight: 1,
          state: "waiting",
          time: 15318088363248
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "98fee35d-4c6f-4931-8579-bdbf410b6f8b",
          transitionId: "02f883b7-7852-43e8-8e44-45d2cf58c070",
          weight: 1,
          state: "passed",
          time: 15318088986752
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "e30c79e8-33cb-467b-8362-ef86965fc40b",
          transitionId: "02f883b7-7852-43e8-8e44-45d2cf58c070",
          weight: 1,
          state: "opened",
          time: 15318088986736
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "98a1dff9-254c-4517-9288-60914c3f8cdb",
          transitionId: "3d68765c-004f-4a70-bfa8-ee80d962e713",
          weight: 1,
          state: "passed",
          time: 15318088986731
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "d00f3154-6892-4b87-a0c8-87bdc2e90f9f",
          transitionId: "3d68765c-004f-4a70-bfa8-ee80d962e713",
          weight: 1,
          state: "opened",
          time: 15318088967457
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "159442c1-7624-4d87-882e-61b51a269dbe",
          transitionId: "137786c9-5b2d-45bb-80ed-c77279f8a124",
          weight: 1,
          state: "passed",
          time: 15318088967452
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "f9476e4b-e2d0-45cd-99e5-39578bac56a5",
          transitionId: "137786c9-5b2d-45bb-80ed-c77279f8a124",
          weight: 1,
          state: "opened",
          time: 15318088967424
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "ea90184f-fe7b-4986-8d2e-050377d80d42",
          transitionId: "f6304050-b1d0-4de7-a914-bb7fa3d57d98",
          weight: 1,
          state: "passed",
          time: 15318088967415
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "a532ce79-7512-4f6e-8a78-0aceafe17ed5",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "edddc1eb-3a10-4b97-a38c-28251888e4c7",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "012b51ef-a60a-4732-9f56-517029b39db0",
          transitionId: "3576fa90-ccb8-4f62-9a69-579a028f88be",
          weight: 1,
          state: "opened",
          time: 15318088363453
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "a21b0628-ceb8-4c4a-a046-315d276974f1",
          transitionId: "3576fa90-ccb8-4f62-9a69-579a028f88be",
          weight: 1,
          state: "passed",
          time: 15318088363461
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "fbe0217a-f6d0-4704-98f3-372b1d6a5348",
          transitionId: "87f8c48b-da70-49c2-9e6d-e2db5e5de64c",
          weight: 1,
          state: "opened",
          time: 15318088363475
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "916691eb-21b5-4d22-b58a-d31a3e4a7f31",
          transitionId: "87f8c48b-da70-49c2-9e6d-e2db5e5de64c",
          weight: 1,
          state: "waiting",
          time: 15318088363505,
          reason: ""
        }
      ],
      waitFor: "http://collector.andshift.loc/jstracker.html"
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "2d17b9ba-ee71-495d-927c-59a1d909ca7b",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "a532ce79-7512-4f6e-8a78-0aceafe17ed5",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "f3554d8b-ebdd-44e9-92b1-5d2acee1e706",
          transitionId: "9a700904-af5f-47cd-989a-578bb11ef97a",
          weight: 1,
          state: "opened",
          time: 15318088363578
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "cab21681-1e73-4a99-83a5-ae851ca7653e",
          transitionId: "9a700904-af5f-47cd-989a-578bb11ef97a",
          weight: 1,
          state: "waiting",
          time: 15318088363585
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "ec9cf0ce-6b5f-4533-95ee-3112c8083c7c",
          transitionId: "c2939650-f487-4973-9d0b-2ab8bb1f40e9",
          weight: 1,
          state: "passed",
          time: 15318088994620
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "7934beaf-6902-4df8-b743-e70380e0faff",
          transitionId: "c2939650-f487-4973-9d0b-2ab8bb1f40e9",
          weight: 1,
          state: "opened",
          time: 15318088994604
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "154d929e-426a-45eb-bdf3-51a192658f07",
          transitionId: "a377d651-3227-4ab2-a8c3-39f15cc677bd",
          weight: 1,
          state: "passed",
          time: 15318088994593
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "deec584d-8088-47c4-87d7-c8900ee481ec",
          transitionId: "a377d651-3227-4ab2-a8c3-39f15cc677bd",
          weight: 1,
          state: "opened",
          time: 15318088969867
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "81f0751d-7d18-4248-bdd1-b50b88ee0a3e",
          transitionId: "767a6e09-13ab-49e4-a30a-000702beab49",
          weight: 1,
          state: "passed",
          time: 15318088969864
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "debf673d-a1a3-4b54-8512-7329c5859456",
          transitionId: "767a6e09-13ab-49e4-a30a-000702beab49",
          weight: 1,
          state: "opened",
          time: 15318088969848
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "b8619eb0-4ea1-483c-9256-606a77033b1a",
          transitionId: "9a700904-af5f-47cd-989a-578bb11ef97a",
          weight: 1,
          state: "passed",
          time: 15318088969844
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "0d31d10b-b9a7-4bc8-925b-d19918c96a9e",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "edddc1eb-3a10-4b97-a38c-28251888e4c7",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "b166c53a-3047-4a96-89f1-c94b163fdbdc",
          transitionId: "29fcd91f-d04b-48cf-8246-ed2881668d81",
          weight: 1,
          state: "opened",
          time: 15318088363712
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "1d4024bb-0557-4e25-a5b6-a7ab3dddb97d",
          transitionId: "29fcd91f-d04b-48cf-8246-ed2881668d81",
          weight: 1,
          state: "passed",
          time: 15318088363717
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "a1c0130b-9b56-4b72-a182-405a5d66ff28",
          transitionId: "eef90408-ed7c-4c85-93e0-91b4e4f7cdcb",
          weight: 1,
          state: "opened",
          time: 15318088363726
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "3f177978-452a-495a-9385-b80539342db1",
          transitionId: "eef90408-ed7c-4c85-93e0-91b4e4f7cdcb",
          weight: 1,
          state: "waiting",
          time: 15318088363753,
          reason: ""
        }
      ],
      waitFor: "1d7ac2c3-e331-4141-8b55-16f2e99b04b0"
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "798e88c9-5822-49ee-aeca-8490621edd61",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "0d31d10b-b9a7-4bc8-925b-d19918c96a9e",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "042a13ea-c8af-46b1-bd5c-bd4b4f048e2d",
          transitionId: "f57ae887-f2c0-4e92-adfd-f51564eea7c1",
          weight: 1,
          state: "opened",
          time: 15318088363825
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "97034822-765e-4fd3-a356-4a5aa49a3c59",
          transitionId: "f57ae887-f2c0-4e92-adfd-f51564eea7c1",
          weight: 1,
          state: "waiting",
          time: 15318088363849,
          reason: ""
        }
      ],
      waitFor: "3cc35845-e1fd-4125-b239-78a9350a0486"
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "6d9f4cae-0e02-4e8c-bbd4-9f4697abb9f9",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "0d31d10b-b9a7-4bc8-925b-d19918c96a9e",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "3c756a5a-3416-462b-944e-b6cd6f5b42d3",
          transitionId: "f01dbe04-acbb-4cc4-9e84-93e04ffe8119",
          weight: 1,
          state: "opened",
          time: 15318088363893
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "22210650-9afe-4eed-b77d-2b77027ca4f8",
          transitionId: "f01dbe04-acbb-4cc4-9e84-93e04ffe8119",
          weight: 1,
          state: "waiting",
          time: 15318088363901
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "53af0345-4a04-48b9-bea3-2152f2cea61d",
          transitionId: "05770158-8cca-4e47-ae81-aa40c20f9e7b",
          weight: 1,
          state: "passed",
          time: 15318089008702
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "95edc966-af02-47db-ac35-cec520c62049",
          transitionId: "05770158-8cca-4e47-ae81-aa40c20f9e7b",
          weight: 1,
          state: "opened",
          time: 15318089008687
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "cf070004-b9ad-4a0d-bfa7-d9cd12a263ef",
          transitionId: "bf9a31c5-1195-4e71-abd5-4ff9e915d7c3",
          weight: 1,
          state: "passed",
          time: 15318089008682
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "59447a32-09a4-4ebe-9972-f6c8de551be4",
          transitionId: "bf9a31c5-1195-4e71-abd5-4ff9e915d7c3",
          weight: 1,
          state: "opened",
          time: 15318088987109
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "e9cf2321-1998-42f7-81aa-1f2f4211a3e2",
          transitionId: "4d917999-a651-4053-956b-af54cb672ac1",
          weight: 1,
          state: "passed",
          time: 15318088987106
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "6c4a1ac4-0b9a-4e07-802d-991c32c5d01f",
          transitionId: "4d917999-a651-4053-956b-af54cb672ac1",
          weight: 1,
          state: "opened",
          time: 15318088987092
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "b05cc13a-5221-44c4-90c5-60ff47b5bb03",
          transitionId: "f01dbe04-acbb-4cc4-9e84-93e04ffe8119",
          weight: 1,
          state: "passed",
          time: 15318088987088
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "2d7a6144-cd29-4636-a7c1-c37ad94cf748",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "edddc1eb-3a10-4b97-a38c-28251888e4c7",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "4ec4a43d-5007-47d7-8e84-6a994b983822",
          transitionId: "eb2e9638-6d59-49f4-b560-256dbb92baae",
          weight: 1,
          state: "opened",
          time: 15318088364023
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "51ed66c3-e2c8-41e1-81e9-3e74e81d56d9",
          transitionId: "eb2e9638-6d59-49f4-b560-256dbb92baae",
          weight: 1,
          state: "passed",
          time: 15318088364028
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "8a084d12-4ace-4b62-bd27-d160299611ac",
          transitionId: "219833bf-f0e5-47e7-b82d-b77310ee3445",
          weight: 1,
          state: "opened",
          time: 15318088364034
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "86174fe2-4e70-43dd-922c-076d309db294",
          transitionId: "219833bf-f0e5-47e7-b82d-b77310ee3445",
          weight: 1,
          state: "waiting",
          time: 15318088364055,
          reason: ""
        }
      ],
      waitFor: "35b07967-5845-4156-afe8-7b3905015c05"
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "4903ee97-4d8a-40d6-bba4-9fd6cc74e019",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "2d7a6144-cd29-4636-a7c1-c37ad94cf748",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "4560e1ae-f027-4d0f-a773-e1a24114f72c",
          transitionId: "1387466d-19ad-472a-a68f-733d59fc4154",
          weight: 1,
          state: "opened",
          time: 15318088364090
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "b5f2798a-471d-498c-92ad-8f3e1585903d",
          transitionId: "1387466d-19ad-472a-a68f-733d59fc4154",
          weight: 1,
          state: "waiting",
          time: 15318088364108,
          reason: ""
        }
      ],
      waitFor: "96523732-c4ec-4fa8-bad5-4702b398afa8"
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "0b8fe7fb-0d9e-4c63-8eeb-17ec68cfaddf",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "2d7a6144-cd29-4636-a7c1-c37ad94cf748",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "0c559705-2022-4aa4-b0f2-f9ba9770803f",
          transitionId: "0f418de2-3fbf-4b4b-8a3d-25fee25801d8",
          weight: 1,
          state: "opened",
          time: 15318088364150
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "3b98e6b0-3a62-4f9b-8dfc-d9e8c70d7632",
          transitionId: "0f418de2-3fbf-4b4b-8a3d-25fee25801d8",
          weight: 1,
          state: "waiting",
          time: 15318088364156
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "cc207731-87bd-4858-9ce3-8ff4b02fd132",
          transitionId: "a57d4d67-6bce-405f-9507-4091c68a1ba6",
          weight: 1,
          state: "passed",
          time: 15318089030116
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "f805f2c6-1af6-4722-b422-648ec6168bf0",
          transitionId: "a57d4d67-6bce-405f-9507-4091c68a1ba6",
          weight: 1,
          state: "opened",
          time: 15318089030102
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "26bbef62-e115-4671-94d5-120bab93f88c",
          transitionId: "6d8d3fe5-881f-48ac-997b-e120777cbfc4",
          weight: 1,
          state: "passed",
          time: 15318089030096
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "b46d61b2-d40d-41c2-8e79-8d336c34a8eb",
          transitionId: "6d8d3fe5-881f-48ac-997b-e120777cbfc4",
          weight: 1,
          state: "opened",
          time: 15318088995417
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "7a63526e-e3a8-4cb4-ad95-435fd36acdd8",
          transitionId: "9d6942b8-f08a-4cc3-abff-94e2c6641642",
          weight: 1,
          state: "passed",
          time: 15318088995414
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "03d38ba1-d7bb-4f38-81ff-88fae6ddaf17",
          transitionId: "9d6942b8-f08a-4cc3-abff-94e2c6641642",
          weight: 1,
          state: "opened",
          time: 15318088995400
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "979ba82d-ba68-4f6a-b50c-8125df70e3d4",
          transitionId: "0f418de2-3fbf-4b4b-8a3d-25fee25801d8",
          weight: 1,
          state: "passed",
          time: 15318088995396
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "d25c6798-ad15-41f9-9482-9a9c027e665f",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "23ad086c-e96e-4051-bfe2-2f8ffc7d9b53",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "afa68adc-3220-42fe-8ee4-6012781a9828",
          transitionId: "b36e8617-f09a-4836-860a-a67489a7c4e2",
          weight: 1,
          state: "interrupted",
          time: 15318088986871,
          reason: ""
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "fb73d4a1-81a1-404f-abd6-4d8682912423",
          transitionId: "b36e8617-f09a-4836-860a-a67489a7c4e2",
          weight: 1,
          state: "interrupted",
          time: 15318088986915
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "ee210551-fc5b-406c-b3c4-8b6364c35244",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "2d17b9ba-ee71-495d-927c-59a1d909ca7b",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "ac7b16cd-e9ba-4859-8289-9a3c885f5295",
          transitionId: "19dab2a3-b5ad-4202-8ea9-effc68819a84",
          weight: 1,
          state: "interrupted",
          time: 15318088994735,
          reason: ""
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "f004dbbd-f6a3-4f2b-8d96-38e79d85371a",
          transitionId: "19dab2a3-b5ad-4202-8ea9-effc68819a84",
          weight: 1,
          state: "interrupted",
          time: 15318088994779
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "bbfd8168-8f01-4b81-b45d-c717cfdb5157",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "6d9f4cae-0e02-4e8c-bbd4-9f4697abb9f9",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "a3f7254b-eba9-452a-9dbf-8468c74ae483",
          transitionId: "f4bcba2b-04c9-4ceb-ada2-2cda9238bb95",
          weight: 1,
          state: "interrupted",
          time: 15318089008737,
          reason: ""
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "04b4083c-9d6c-49da-b920-8c6553fff2e5",
          transitionId: "f4bcba2b-04c9-4ceb-ada2-2cda9238bb95",
          weight: 1,
          state: "interrupted",
          time: 15318089008758
        }
      ]
    },
    {
      schema: "http://pvm.forma-pro.com/schemas/Token.json",
      id: "771bdee0-dcc0-4c2e-b1b6-d2ad7ee90f6b",
      processId: "749d7410-e1b0-4f27-aa35-97d09018754e",
      campaignId: "3569b06f-2210-48f4-853d-9a0d35c08182",
      forkedFrom: "0b8fe7fb-0d9e-4c63-8eeb-17ec68cfaddf",
      leadId: "fcfc912c-7d5d-4701-b12d-ca272a202a76",
      leadListIds: ["479c5111-04ba-4117-b6fc-b49673d05758"],
      transitions: [
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "faa66473-1e4d-40c2-b492-6ea8e2c7a203",
          transitionId: "2699fb31-9081-444a-954f-d4f7d09df241",
          weight: 1,
          state: "opened",
          time: 15318089030147
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "ff3b37f6-3d12-4466-bf1a-f7cc36970211",
          transitionId: "2699fb31-9081-444a-954f-d4f7d09df241",
          weight: 1,
          state: "passed",
          time: 15318089030164
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "4f9d99e9-4a2f-473f-a1be-73311c074784",
          transitionId: "28b29a46-fb34-4e90-a1bc-a6ca7baf23fa",
          weight: 1,
          state: "opened",
          time: 15318089030168
        },
        {
          schema: "http://pvm.forma-pro.com/schemas/TokenTransition.json",
          id: "52eca0b5-3c01-46ee-b2d2-2f0fe258b555",
          transitionId: "28b29a46-fb34-4e90-a1bc-a6ca7baf23fa",
          weight: 1,
          state: "passed",
          time: 15318089030179
        }
      ]
    }
  ],
  dot:
    'digraph G {\n  graph [rankdir="TB" ranksep=0.5]\n  "__start" [label="Start" color="blue" shape="circle"]\n  "__end" [label="End" color="red" shape="circle"]\n  "ad2fcc3c-ee83-40cc-9d76-cdb21d573098" [label="Start Node" id="ad2fcc3c-ee83-40cc-9d76-cdb21d573098" shape="box"]\n  "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99" [label="Track Lead Event: campaign_started" id="4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99" shape="box"]\n  "6987eee6-de9e-43be-be87-df2b5e2fccb3" [label="Send Email" id="6987eee6-de9e-43be-be87-df2b5e2fccb3" shape="box"]\n  "a769b5b1-4aba-46ca-880b-239ff0ec11f1" [label="Track Lead Event: email_sent" id="a769b5b1-4aba-46ca-880b-239ff0ec11f1" shape="box"]\n  "48276a72-2466-4bbd-bc1a-d2fce97f7d2f" [label="Node IN" id="48276a72-2466-4bbd-bc1a-d2fce97f7d2f" shape="box"]\n  "c744075e-d484-4c17-8b65-90cc0700a0ed" [label="Email Opened" id="c744075e-d484-4c17-8b65-90cc0700a0ed" shape="box"]\n  "dac11853-b391-4f22-898c-57485bc7371b" [label="Decision" id="dac11853-b391-4f22-898c-57485bc7371b" shape="box"]\n  "551e3295-0979-4f36-9b0b-8e6aafe3da7d" [label="Track Lead Event: email_opened" id="551e3295-0979-4f36-9b0b-8e6aafe3da7d" shape="box"]\n  "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8" [label="Node IN" id="dc2860df-cf58-4c9d-97a4-2c6fd084b3d8" shape="box"]\n  "5521d37b-7dbe-4306-ab89-056954ce3138" [label="Page Visited" id="5521d37b-7dbe-4306-ab89-056954ce3138" shape="box"]\n  "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" [label="Decision" id="cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" shape="box"]\n  "6c634d99-f987-4ca5-bddd-c1f67d6f4f43" [label="Adjust Lead Points" id="6c634d99-f987-4ca5-bddd-c1f67d6f4f43" shape="box"]\n  "96e96da8-83cd-4be5-b96d-1df8c5c06aaf" [label="Track Lead Event: page_visited" id="96e96da8-83cd-4be5-b96d-1df8c5c06aaf" shape="box"]\n  "70c21805-b330-449a-8bb1-b4695e512237" [label="Node IN" id="70c21805-b330-449a-8bb1-b4695e512237" shape="box"]\n  "f91c8041-7ce1-4188-939b-74523a741440" [label="Decision" id="f91c8041-7ce1-4188-939b-74523a741440" shape="box"]\n  "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f" [label="Adjust Lead Points" id="28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f" shape="box"]\n  "3bbb9c6c-af63-47fa-b5e0-50a55965d027" [label="Track Lead Event: form_submitted" id="3bbb9c6c-af63-47fa-b5e0-50a55965d027" shape="box"]\n  "305941e4-6e5f-4155-be88-3fc45dcc14be" [label="Form Submitted" id="305941e4-6e5f-4155-be88-3fc45dcc14be" shape="box"]\n  "00870ce1-fa5a-4f79-9534-a72bce9b7cc2" [label="Form Submitted" id="00870ce1-fa5a-4f79-9534-a72bce9b7cc2" shape="box"]\n  "8b200471-dea2-427d-a5bc-1d31630c9e62" [label="Node IN" id="8b200471-dea2-427d-a5bc-1d31630c9e62" shape="box"]\n  "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" [label="Decision" id="9afb8da2-73e0-4694-89af-b5d0f53bfbcb" shape="box"]\n  "dac23075-d334-4b73-8f9f-377ca4fe116e" [label="Adjust Lead Points" id="dac23075-d334-4b73-8f9f-377ca4fe116e" shape="box"]\n  "335de7d2-2869-437f-b77e-e7e66ff96349" [label="Track Lead Event: asset_downloaded" id="335de7d2-2869-437f-b77e-e7e66ff96349" shape="box"]\n  "538e8c4b-f93a-4264-b3cc-bacf822c0ff2" [label="Asset Downloaded" id="538e8c4b-f93a-4264-b3cc-bacf822c0ff2" shape="box"]\n  "e341a240-7ccb-47c1-a3bf-62ce163f9252" [label="Asset Downloaded" id="e341a240-7ccb-47c1-a3bf-62ce163f9252" shape="box"]\n  "96ade489-1612-421f-b010-fee2ee10e02f" [label="Remove lead from list(s)" id="96ade489-1612-421f-b010-fee2ee10e02f" shape="box"]\n  "c1d51c30-06f0-4722-bb1f-e0409022bdf9" [label="Add lead to list(s)" id="c1d51c30-06f0-4722-bb1f-e0409022bdf9" shape="box"]\n  "2dd8cfb2-f8ec-49aa-937b-b2f64e172815" [label="Track Lead Event: lead_list_modified" id="2dd8cfb2-f8ec-49aa-937b-b2f64e172815" shape="box"]\n  "28aa4fa9-ecd0-4fac-9f60-6e2756000425" [label="Send Email" id="28aa4fa9-ecd0-4fac-9f60-6e2756000425" shape="box"]\n  "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517" [label="Track Lead Event: email_sent" id="6e9dcb22-6721-44f0-bef5-ab5f6a7d5517" shape="box"]\n  "c9373a38-a325-4804-a531-4d11038d81bc" [label="Send Email" id="c9373a38-a325-4804-a531-4d11038d81bc" shape="box"]\n  "17499840-cefe-4f5f-82c0-66481c28b3da" [label="Track Lead Event: email_sent" id="17499840-cefe-4f5f-82c0-66481c28b3da" shape="box"]\n  "143e8707-8f7b-4a36-a13b-02fa63ac0fe7" [label="Send Email" id="143e8707-8f7b-4a36-a13b-02fa63ac0fe7" shape="box"]\n  "3e286e68-6c4a-4418-a8c2-046622dd84ce" [label="Track Lead Event: email_sent" id="3e286e68-6c4a-4418-a8c2-046622dd84ce" shape="box"]\n  "033160a7-680d-4c8d-92be-419782f3bd83" [label="Send Email" id="033160a7-680d-4c8d-92be-419782f3bd83" shape="box"]\n  "dd621ba2-f338-472d-82a0-7b2037becb37" [label="Track Lead Event: email_sent" id="dd621ba2-f338-472d-82a0-7b2037becb37" shape="box"]\n  "53fb927b-6927-459a-8d8f-d39f11adf94b" [label="Wait" id="53fb927b-6927-459a-8d8f-d39f11adf94b" shape="box"]\n  "40485193-be2a-4bc0-a579-087014bb9de4" [label="Wait" id="40485193-be2a-4bc0-a579-087014bb9de4" shape="box"]\n  "b1922840-e3fe-4206-9396-731be17b8af3" [label="Wait" id="b1922840-e3fe-4206-9396-731be17b8af3" shape="box"]\n  "22fef1e6-106e-4f23-8de7-3723c5fdbe70" [label="Wait" id="22fef1e6-106e-4f23-8de7-3723c5fdbe70" shape="box"]\n  "23b54395-8336-49eb-a6f2-240e7adbc832" [label="All paths finished" id="23b54395-8336-49eb-a6f2-240e7adbc832" shape="box"]\n  "5063a655-c32d-4def-af53-f2c29fd89fd7" [label="Track Lead Event: campaign_finished" id="5063a655-c32d-4def-af53-f2c29fd89fd7" shape="box"]\n  "__start" -> "ad2fcc3c-ee83-40cc-9d76-cdb21d573098" [label="" color="blue"]\n  "__start" -> "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99" [label="" color="blue"]\n  "4fdc50f7-bb96-4496-bda4-ac5b8f0b2e99" -> "__end" [label="" color="blue"]\n  "6987eee6-de9e-43be-be87-df2b5e2fccb3" -> "a769b5b1-4aba-46ca-880b-239ff0ec11f1" [id="c80a5d41-e486-4189-82f8-23f1faaee6cd" label="" color="blue"]\n  "a769b5b1-4aba-46ca-880b-239ff0ec11f1" -> "__end" [label="" color="blue"]\n  "48276a72-2466-4bbd-bc1a-d2fce97f7d2f" -> "c744075e-d484-4c17-8b65-90cc0700a0ed" [id="a9c207d9-6d59-4d55-b2a5-505b9ff85260" label="" color="orange"]\n  "c744075e-d484-4c17-8b65-90cc0700a0ed" -> "dac11853-b391-4f22-898c-57485bc7371b" [id="b49ed6d2-d3f7-4e64-b010-e273821c7275" label="success"]\n  "dac11853-b391-4f22-898c-57485bc7371b" -> "551e3295-0979-4f36-9b0b-8e6aafe3da7d" [id="7d0e72d8-7c15-4b95-9418-f511e21a1fee" label="success"]\n  "551e3295-0979-4f36-9b0b-8e6aafe3da7d" -> "__end" [label="success"]\n  "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8" -> "5521d37b-7dbe-4306-ab89-056954ce3138" [id="87f8c48b-da70-49c2-9e6d-e2db5e5de64c" label="" color="orange"]\n  "5521d37b-7dbe-4306-ab89-056954ce3138" -> "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" [id="a35697fc-957b-4ad1-840e-9dd71276cb87" label="success"]\n  "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" -> "6c634d99-f987-4ca5-bddd-c1f67d6f4f43" [id="90950378-4710-4651-aa3b-e370825cfc1f" label="success"]\n  "6c634d99-f987-4ca5-bddd-c1f67d6f4f43" -> "__end" [label="success"]\n  "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" -> "96e96da8-83cd-4be5-b96d-1df8c5c06aaf" [id="383b9225-2e35-449f-8681-fea3c8e26c01" label="success"]\n  "96e96da8-83cd-4be5-b96d-1df8c5c06aaf" -> "__end" [label="success"]\n  "f91c8041-7ce1-4188-939b-74523a741440" -> "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f" [id="ba0103c9-ed6c-4dfb-a431-0d01dcde8ee7" label="success"]\n  "28a4bcb8-d0ec-4beb-a5ac-8d8ce084409f" -> "__end" [label="success"]\n  "f91c8041-7ce1-4188-939b-74523a741440" -> "3bbb9c6c-af63-47fa-b5e0-50a55965d027" [id="c708b971-2e09-46e1-addc-237d01a5539c" label="success"]\n  "3bbb9c6c-af63-47fa-b5e0-50a55965d027" -> "__end" [label="success"]\n  "70c21805-b330-449a-8bb1-b4695e512237" -> "305941e4-6e5f-4155-be88-3fc45dcc14be" [id="eef90408-ed7c-4c85-93e0-91b4e4f7cdcb" label="" color="orange"]\n  "305941e4-6e5f-4155-be88-3fc45dcc14be" -> "f91c8041-7ce1-4188-939b-74523a741440" [id="c9d455f2-7017-4439-b69c-d90fc7ac8bba" label="success"]\n  "70c21805-b330-449a-8bb1-b4695e512237" -> "00870ce1-fa5a-4f79-9534-a72bce9b7cc2" [id="f57ae887-f2c0-4e92-adfd-f51564eea7c1" label="" color="orange"]\n  "00870ce1-fa5a-4f79-9534-a72bce9b7cc2" -> "f91c8041-7ce1-4188-939b-74523a741440" [id="3616f1a9-b73d-4928-b073-9387f480ca6b" label="success"]\n  "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" -> "dac23075-d334-4b73-8f9f-377ca4fe116e" [id="dce257d5-c2f6-46ca-98b6-5e817ccce99e" label="success"]\n  "dac23075-d334-4b73-8f9f-377ca4fe116e" -> "__end" [label="success"]\n  "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" -> "335de7d2-2869-437f-b77e-e7e66ff96349" [id="e03a6b4f-743c-403c-9087-6509d93e2ed3" label="success"]\n  "335de7d2-2869-437f-b77e-e7e66ff96349" -> "__end" [label="success"]\n  "8b200471-dea2-427d-a5bc-1d31630c9e62" -> "538e8c4b-f93a-4264-b3cc-bacf822c0ff2" [id="219833bf-f0e5-47e7-b82d-b77310ee3445" label="" color="orange"]\n  "538e8c4b-f93a-4264-b3cc-bacf822c0ff2" -> "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" [id="80d1b6c2-8e66-48d8-be97-fe97c3ddc503" label="success"]\n  "8b200471-dea2-427d-a5bc-1d31630c9e62" -> "e341a240-7ccb-47c1-a3bf-62ce163f9252" [id="1387466d-19ad-472a-a68f-733d59fc4154" label="" color="orange"]\n  "e341a240-7ccb-47c1-a3bf-62ce163f9252" -> "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" [id="b593942b-83dc-4fba-b54b-d442ff8cb0ad" label="success"]\n  "96ade489-1612-421f-b010-fee2ee10e02f" -> "c1d51c30-06f0-4722-bb1f-e0409022bdf9" [id="48cbc303-3c2a-4345-abcf-85a7b719db0e" label=""]\n  "c1d51c30-06f0-4722-bb1f-e0409022bdf9" -> "__end" [label=""]\n  "96ade489-1612-421f-b010-fee2ee10e02f" -> "2dd8cfb2-f8ec-49aa-937b-b2f64e172815" [id="b6bb4471-f9e1-40ab-8919-9da9121c2de9" label=""]\n  "2dd8cfb2-f8ec-49aa-937b-b2f64e172815" -> "__end" [label=""]\n  "28aa4fa9-ecd0-4fac-9f60-6e2756000425" -> "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517" [id="02f883b7-7852-43e8-8e44-45d2cf58c070" label="" color="blue"]\n  "6e9dcb22-6721-44f0-bef5-ab5f6a7d5517" -> "__end" [label="" color="blue"]\n  "c9373a38-a325-4804-a531-4d11038d81bc" -> "17499840-cefe-4f5f-82c0-66481c28b3da" [id="c2939650-f487-4973-9d0b-2ab8bb1f40e9" label="" color="blue"]\n  "17499840-cefe-4f5f-82c0-66481c28b3da" -> "__end" [label="" color="blue"]\n  "143e8707-8f7b-4a36-a13b-02fa63ac0fe7" -> "3e286e68-6c4a-4418-a8c2-046622dd84ce" [id="05770158-8cca-4e47-ae81-aa40c20f9e7b" label="" color="blue"]\n  "3e286e68-6c4a-4418-a8c2-046622dd84ce" -> "__end" [label="" color="blue"]\n  "033160a7-680d-4c8d-92be-419782f3bd83" -> "dd621ba2-f338-472d-82a0-7b2037becb37" [id="a57d4d67-6bce-405f-9507-4091c68a1ba6" label="" color="blue"]\n  "dd621ba2-f338-472d-82a0-7b2037becb37" -> "__end" [label="" color="blue"]\n  "ad2fcc3c-ee83-40cc-9d76-cdb21d573098" -> "6987eee6-de9e-43be-be87-df2b5e2fccb3" [id="079f7aba-12fe-4bee-9566-e335577b55af" label="" color="blue"]\n  "ad2fcc3c-ee83-40cc-9d76-cdb21d573098" -> "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8" [id="3576fa90-ccb8-4f62-9a69-579a028f88be" label="" color="blue"]\n  "ad2fcc3c-ee83-40cc-9d76-cdb21d573098" -> "70c21805-b330-449a-8bb1-b4695e512237" [id="29fcd91f-d04b-48cf-8246-ed2881668d81" label="" color="blue"]\n  "ad2fcc3c-ee83-40cc-9d76-cdb21d573098" -> "8b200471-dea2-427d-a5bc-1d31630c9e62" [id="eb2e9638-6d59-49f4-b560-256dbb92baae" label="" color="blue"]\n  "6987eee6-de9e-43be-be87-df2b5e2fccb3" -> "48276a72-2466-4bbd-bc1a-d2fce97f7d2f" [id="986c9be9-de9b-4737-92f3-860c07271b5e" label="" color="blue"]\n  "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" -> "96ade489-1612-421f-b010-fee2ee10e02f" [id="7e261a31-622c-42a1-a387-8516ba3f099b" label="success"]\n  "48276a72-2466-4bbd-bc1a-d2fce97f7d2f" -> "53fb927b-6927-459a-8d8f-d39f11adf94b" [id="f6304050-b1d0-4de7-a914-bb7fa3d57d98" label="" color="blue"]\n  "53fb927b-6927-459a-8d8f-d39f11adf94b" -> "dac11853-b391-4f22-898c-57485bc7371b" [id="137786c9-5b2d-45bb-80ed-c77279f8a124" label="" color="blue"]\n  "dac11853-b391-4f22-898c-57485bc7371b" -> "28aa4fa9-ecd0-4fac-9f60-6e2756000425" [id="3d68765c-004f-4a70-bfa8-ee80d962e713" label="fail" color="blue"]\n  "dc2860df-cf58-4c9d-97a4-2c6fd084b3d8" -> "40485193-be2a-4bc0-a579-087014bb9de4" [id="9a700904-af5f-47cd-989a-578bb11ef97a" label="" color="blue"]\n  "40485193-be2a-4bc0-a579-087014bb9de4" -> "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" [id="767a6e09-13ab-49e4-a30a-000702beab49" label="" color="blue"]\n  "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" -> "c9373a38-a325-4804-a531-4d11038d81bc" [id="a377d651-3227-4ab2-a8c3-39f15cc677bd" label="fail" color="blue"]\n  "70c21805-b330-449a-8bb1-b4695e512237" -> "b1922840-e3fe-4206-9396-731be17b8af3" [id="f01dbe04-acbb-4cc4-9e84-93e04ffe8119" label="" color="blue"]\n  "b1922840-e3fe-4206-9396-731be17b8af3" -> "f91c8041-7ce1-4188-939b-74523a741440" [id="4d917999-a651-4053-956b-af54cb672ac1" label="" color="blue"]\n  "f91c8041-7ce1-4188-939b-74523a741440" -> "143e8707-8f7b-4a36-a13b-02fa63ac0fe7" [id="bf9a31c5-1195-4e71-abd5-4ff9e915d7c3" label="fail" color="blue"]\n  "8b200471-dea2-427d-a5bc-1d31630c9e62" -> "22fef1e6-106e-4f23-8de7-3723c5fdbe70" [id="0f418de2-3fbf-4b4b-8a3d-25fee25801d8" label="" color="blue"]\n  "22fef1e6-106e-4f23-8de7-3723c5fdbe70" -> "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" [id="9d6942b8-f08a-4cc3-abff-94e2c6641642" label="" color="blue"]\n  "9afb8da2-73e0-4694-89af-b5d0f53bfbcb" -> "033160a7-680d-4c8d-92be-419782f3bd83" [id="6d8d3fe5-881f-48ac-997b-e120777cbfc4" label="fail" color="blue"]\n  "23b54395-8336-49eb-a6f2-240e7adbc832" -> "5063a655-c32d-4def-af53-f2c29fd89fd7" [id="28b29a46-fb34-4e90-a1bc-a6ca7baf23fa" label="" color="blue"]\n  "5063a655-c32d-4def-af53-f2c29fd89fd7" -> "__end" [label="" color="blue"]\n  "dac11853-b391-4f22-898c-57485bc7371b" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="f782bdb5-7685-40eb-ba52-85c1df5a79ab" label="success"]\n  "28aa4fa9-ecd0-4fac-9f60-6e2756000425" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="b36e8617-f09a-4836-860a-a67489a7c4e2" label="" color="red"]\n  "cbdc255a-7f50-4bfe-8f81-b3057ce8b88e" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="3f1f7edb-87fd-4e44-919b-a0f9d563339e" label="success"]\n  "c9373a38-a325-4804-a531-4d11038d81bc" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="19dab2a3-b5ad-4202-8ea9-effc68819a84" label="" color="red"]\n  "f91c8041-7ce1-4188-939b-74523a741440" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="e02867af-a8c2-436c-8d8e-5078a5a76a53" label="success"]\n  "143e8707-8f7b-4a36-a13b-02fa63ac0fe7" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="f4bcba2b-04c9-4ceb-ada2-2cda9238bb95" label="" color="red"]\n  "96ade489-1612-421f-b010-fee2ee10e02f" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="61866d6d-d590-4381-8ebf-2e203085d256" label=""]\n  "033160a7-680d-4c8d-92be-419782f3bd83" -> "23b54395-8336-49eb-a6f2-240e7adbc832" [id="2699fb31-9081-444a-954f-d4f7d09df241" label="" color="blue"]\n}\n'
};

main(json).catch(console.error);
