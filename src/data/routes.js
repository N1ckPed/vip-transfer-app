const routes = [
  // Hotel User: Creta Maris
  {
    user: "Creta Maris Hotel",
    role: "hotel",
    from: "Heraklion Airport",
    to: "Creta Maris Hotel",
    prices: {
      Sedan: 45,
      Vito: 60,
      Van: 75
    }
  },
  {
    user: "Creta Maris Hotel",
    role: "hotel",
    from: "Creta Maris Hotel",
    to: "Heraklion Airport",
    prices: {
      Sedan: 45,
      Vito: 60,
      Van: 75
    }
  },

  // Travel Agency: Daffis
  {
    user: "Daffis Travel",
    role: "agency",
    route: "Heraklion Airport → Chersonissos",
    prices: {
      Sedan: 50,
      Vito: 60,
      Van: 80
    }
  },
  {
    user: "Daffis Travel",
    role: "agency",
    route: "Heraklion Airport → Stalis",
    prices: {
      Sedan: 40,
      Vito: 55,
      Van: 70
    }
  }
];

export default routes;
