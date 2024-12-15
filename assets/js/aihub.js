const loadAiUniverseHub = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const aiUniHubs = data.data.tools;

  showAiUniverseHub(aiUniHubs);
};

const showAiUniverseHub = (aiUniHubs) => {
  const aiHubContainer = document.getElementById("ai-hub-container");
  aiHubContainer.textContent = "";

  aiUniHubs.forEach((aiUniHub) => {
    const imageUrl = aiUniHub.image;
    const fixedUrl = decodeURIComponent(imageUrl);
    // console.log(fixedUrl);
    const aiHubCard = document.createElement("div");
    aiHubCard.classList = "card border border-ashcolor p-6";
    aiHubCard.innerHTML = `
        <figure class="">
            <img src="${fixedUrl}" alt=""
                class="rounded-xl" />
        </figure>
        <div class="mt-6">
            <h2 class="font-worksans font-semibold text-2xl text-newblack mb-4">Features</h2>
            <ul class="font-worksans font-normal text-base text-newash list-decimal list-inside pb-6 border-b-[1px]">
                ${aiUniHub.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}
            </ul>
            <div class="flex items-center justify-between pt-6">
                <div>
                    <h4 class="font-worksans font-semibold text-2xl text-newblack mb-1">${
                      aiUniHub.name
                    }</h4>
                    <time datetime="" class="font-worksans font-medium text-base text-newash"><i class="fa-regular fa-calendar-days"></i> <span>${
                      aiUniHub.published_in
                    }</span></time>
                </div>

                <div>
                    <button onclick="handleShowAiUniHub('${
                      aiUniHub.id
                    }')" class="px-3 py-2 bg-[#FEF7F7] text-[#EB5757] rounded-full text-xl"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    `;
    aiHubContainer.appendChild(aiHubCard);
  });
};

const handleShowAiUniHub = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/ai/tool/${id}`
    );
    const data = await res.json();
    const aiUniHubDetails = data.data;
    showDetails(aiUniHubDetails);
  } catch (error) {
    console.error("Something went wrong on single AI Hub", error);
  }
};

const showDetails = (aiUniHubDetails) => {
  // console.log(aiUniHubDetails);
  const aiUniHubDetailContainer = document.getElementById(
    "aiUniHub-detail-container"
  );
  aiUniHubDetailContainer.textContent = "";

  const textColors = ["text-[#03A30A]", "text-[#F28927]", "text-[#EB5757]"];

  const detailDiv = document.createElement("div");
  detailDiv.classList = "flex items-center justify-between gap-5";

  detailDiv.innerHTML = `
    <div class="flex flex-col flex-1 border border-[#EB5757] bg-[#EB57570D] rounded-2xl p-4">
      <h3 class="font-worksans font-semibold text-2xl text-newblack">${
        aiUniHubDetails.description
      }</h3>

      <div class="flex gap-4 my-6">

        ${aiUniHubDetails.pricing
          .map(
            (item, index) => `
            <div class="flex items-center justify-center bg-white px-6 py-5 rounded-2xl">
                <p class="font-worksans font-bold text-center text-base ${textColors[index]}">
                    ${item.price} ${item.plan}
                </p>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="flex justify-between items-center">
          <div>
              <h4 class="font-worksans font-semibold text-2xl text-newblack">Features</h4>
              <ul class="list-disc list-inside font-worksans font-normal text-base text-newash">
                  ${Object.values(aiUniHubDetails.features)
                    .map((feature) => `<li>${feature.feature_name}</li>`)
                    .join("")}
              </ul>
          </div>
          
          <div>
              <h4 class="font-worksans font-semibold text-2xl text-newblack">Integrations</h4>
              <ul class="list-disc list-inside font-worksans font-normal text-base text-newash">
                  ${aiUniHubDetails.integrations
                    .map((integration) => `<li>${integration}</li>`)
                    .join("")}
              </ul>
          </div>
      </div>
  </div>

  <!-- right content -->
  <div class="flex flex-col flex-1 border border-[#E7E7E7] bg-[#FFFFFF] rounded-2xl">
      <div class="card p-6">
          <figure class="">
              <img src="${aiUniHubDetails.image_link[0]}" alt=""
                  class="rounded-xl">
          </figure>
          <div class="mt-6 text-center">
              <h2 class="font-worksans font-semibold text-2xl text-newblack mb-4">Hi, how are you doing today?</h2>
              <p class="font-worksans font-normal text-base text-newash">
                  I'm doing well, thank you for asking. How can I assist you today?
              </p>
              
          </div>
      </div>
  </div>

  `;

  aiUniHubDetailContainer.appendChild(detailDiv);

  aiUniHub_modal.showModal();
};

loadAiUniverseHub();
