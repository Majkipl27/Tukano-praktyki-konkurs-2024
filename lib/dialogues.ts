type Dialogue = {
  [key: number]: {
    text: string;
    options: {
      text: string;
      next: number;
    }[];
  };
};

export const dialogues: Dialogue = {
  1: {
    text: "Hej, jestem Tomek! Jestem Tukanem, mieszkającym w tej dżungli! Przejdźmy się na wycieczkę!",
    options: [
      {
        text: "Nie, dzieki!",
        next: 2,
      },
      {
        text: "Jak jest na polanie? Zaprowadzisz mnie tam?",
        next: 4,
      },
    ],
  },
  2: {
    text: "Potraktuję to jako przytaknięcie!",
    options: [
      {
        text: "(Kontynuuj)",
        next: 3,
      },
    ],
  },
  3: {
    text: "Chodźmy na polanę!",
    options: [
      {
        text: "(Kontynuuj)",
        next: 4,
      },
    ],
  },
  4: {
    text: "Polana jest piękna! Wszystkie zwierzęta z dżungli spotykają się tam, by się bawić i odpocząć! Dawno jej nie odwiedzałem. Chodźmy!",
    options: [
      {
        text: "(Kontynuuj)",
        next: 5,
      },
    ],
  },
  5: {
    text: "Hmmm... jest pewien problem, nie jestem pewien którędy powinniśmy iść. Wiesz, jestem tukanem, a nie mapą! I chociaż mam piękne kolory, to mam już swoje lata i moja pamięć często szwankuje!",
    options: [
      {
        text: "(Kontynuuj)",
        next: 6,
      },
    ],
  },
  6: {
    text: "Ale jeśli dasz mi mapę, lub ją narysujesz z pamięci, na pewno znajdziemy drogę!",
    options: [
      {
        text: "(Kontynuuj)",
        next: 7,
      },
    ],
  },
  7: {
    text: "Pamiętaj aby oznaczyć punkt w którym się znajdujemy literą S, a polanę literą P! Przydałby się też czas przejścia między punktami, w minutach, aby wybrać najoptymalniejszą drogę! Możesz także sprawdzić mapy z mojego zasobnika, może któraś z nich się nada!",
    options: [
      {
        text: "Podaj mapę (Max 3MB)",
        next: 7,
      },
      {
        text: "Narysuj mapę",
        next: 7,
      },
    ],
  },
  8: {
    text: "Świetnie! Daj mi chwilę na przeanalizowanie mapy! (Request został wysłany, więc to może chwilę potrwać)",
    options: [],
  },
  9: {
    text: "",
    options: [
      {
        text: "(Kontynuuj)",
        next: 10,
      },
    ],
  },
  9.5: {
    text: "",
    options: [
      {
        text: "(Kontynuuj)",
        next: 10,
      },
    ],
  },
  10: {
    text: "Wydaje mi się, że ta mapa może być nieco zbyt skomplikowana dla mnie. Może spróbujesz narysować ją jeszcze raz? (możesz też sprawdzić consolę czy nie wysypało błędu)",
    options: [
      {
        text: "(Kontynuuj)",
        next: 7,
      },
    ],
  },
  10.5: {
    text: "",
    options: [
      {
        text: "(Kontynuuj)",
        next: 11,
      },
    ],
  },
  11: {
    text: "",
    options: [
      {
        text: "(Kontynuuj)",
        next: 12,
      },
    ],
  },
  12: {
    text: "To naprawdę dobrze wykonana mapa! Czy mogę ją zatrzymać i udostępnić przyszłym napotkanym osobom?",
    options: [],
  },
  13: {
    text: "Komu w drogę temu czas!",
    options: [
      {
        text: "Wyruszajmy!",
        next: 14,
      },
    ],
  },
  14: {
    text: "",
    options: [
      {
        text: "(Kontynuuj)",
        next: 15,
      },
    ],
  },
  15: {
    text: "Jesteśmy na miejscu.",
    options: [
      {
        text: "Dzięki za pomoc! Tutaj jest na prawdę pięknie!",
        next: 16,
      },
    ],
  },
  16: {
    text: "Nie ma sprawy! Miło było znowu odwiedzić to miejsce! Do zobaczenia!",
    options: [],
  },
};

export async function fetchPath(
  map: File
): Promise<number | { distance: number; path: string[] }> {
  const formData = new FormData();
  formData.append("graph", map);
  const response = await fetch("/api/analize", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) return 400;
  const data = await response.json();

  if (data.status !== 200) return 400;
  return data.body.message;
}

export async function publishMap(
  map: File
): Promise<number | { distance: number; path: string[] }> {
  const formData = new FormData();
  formData.append("graph", map);
  const response = await fetch("/api/publish", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) return 400;
  const data = await response.json();

  if (data.status !== 200) return 400;
  return data.body.message;
}

export async function fetchMaps(): Promise<
  { id: number; data: Buffer; distance: number; path: string }[]
> {
  const response = await fetch("/api/maps");
  if (!response.ok) return [];
  const data = await response.json();

  if (data.status !== 200) return [];
  return data.body.maps;
}
