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
    text: "Jest tam pięknie! Wszystkie zwierzęta z dżungli spotykają się tam, by się bawić i odpocząć! Dawno jej nie odwiedzałem. Chodźmy!",
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
    text: "Pamiętaj aby oznaczyć punkt w którym się znajdujemy literą S, a polanę literą P! Przydałby się też czas przejścia między punktami, w minutach, aby wybrać najoptymalniejszą drogę!",
    options: [
      {
        text: "Podaj mapę",
        next: 7,
      },
      {
        text: "Narysuj mapę",
        next: 7,
      },
    ],
  },
};
