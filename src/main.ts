import "./style.css";
const FOLDER_ID = import.meta.env.VITE_MENU_URL as string;

interface MenuItem {
  name: string;
  section: string;
  description?: string | null;
  price: number | null;
  precio_sin_itbis: number;
  subtext?: string;
  display: boolean;
}

interface MenuData {
  sections: string[];
  items: MenuItem[];
}

export async function listPublicFiles(): Promise<MenuData> {

  const fileUrl = FOLDER_ID
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const fileData: MenuData = await response.json()

  return fileData
}

const jsonContent = await listPublicFiles()

// Data Filtering
const postres = jsonContent.items.filter((x) => x.section === "Postres" && x.display);
const coffee = jsonContent.items.filter((x) => x.section === "Café" && x.display);
const jugos = jsonContent.items.filter((x) => x.section === "Jugos" && x.display);
const tragos = jsonContent.items.filter((x) => x.section === "Cocteles" && x.display);
const cervezas = jsonContent.items.filter((x) => x.section === "Alcohol" && x.display);
const burger = jsonContent.items.filter((x) => x.section === "Burger" && x.display);
const alitas = jsonContent.items.filter((x) => x.section === "Alitas" && x.display);

function renderItems() {
  const postresSection = document.getElementById("postres-list");
  const coffeeSection = document.getElementById("coffee-list");
  const jugosSection = document.getElementById("jugos-list");
  const tragosSection = document.getElementById("tragos-list");
  const cervezasSection = document.getElementById("cervezas-list");
  const burgerSection = document.getElementById("hamburger-list");
  const alitasSection = document.getElementById("alitas-list");

  // Helper to handle wrapping + dotted leader
  const rowTemplate = (item: MenuItem, isAnsuz: boolean = false, isBebida = false) => {
    return `
    <div class="flex items-end gap-2 w-full">
        <div class="flex flex-col min-w-0">
            <span class="font-bold leading-tight ${isAnsuz ? "text-white" : isBebida ? "text-[#E1E1E1]" : ""}">${item.name}</span>
            ${item.description ? `<span class="text-[10px] ${isAnsuz ? "text-white" : isBebida ? "text-[#E1E1E1]" : ""} italic text-stone-400 leading-tight">${item.description}</span>` : ""}
        </div>
        <div class="dotted-leader"></div>
        <span class="font-bold flex-shrink-0 ${isAnsuz ? "text-white" : isBebida ? "text-[#E1E1E1]" : ""}">RD$ ${item.precio_sin_itbis}</span>
    </div>
  `;
  }

  if (postresSection) {
    postresSection.innerHTML = postres
      .map((x) => rowTemplate(x, false))
      .join("");
  }

  if (coffeeSection) {
    coffeeSection.innerHTML = coffee.map((x) => rowTemplate(x, false)).join("");
  }

  if (burgerSection) {
    burgerSection.innerHTML = burger.map((x) => rowTemplate(x, true)).join("");
  }

  if (alitasSection) {
    alitasSection.innerHTML = alitas.map((x) => rowTemplate(x, true)).join("");
  }

  if (cervezasSection) {
    cervezasSection.innerHTML = cervezas.map((x) => rowTemplate(x, false, true)).join("");
  }

  if (jugosSection) {
    jugosSection.innerHTML = jugos.map((x) => rowTemplate(x, false, true)).join("");
  }

  if (tragosSection) {
    tragosSection.innerHTML = tragos.map((x) => rowTemplate(x, false, true)).join("");
  }

}

renderItems()
