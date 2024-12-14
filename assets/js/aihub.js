const loadAiUniverseHub = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const aiUniHubs = data.data.tools;
  console.log(aiUniHubs);
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

const handleShowAiUniHub = (id) => {
  console.log(id);
  aiUniHub_modal.showModal();
};

loadAiUniverseHub();
