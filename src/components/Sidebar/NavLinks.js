// sidebar nav links
export default {
  category1: [
    {
      menu_title: "sidebar.dashboard",
      menu_icon: "fa fa-dashboard",
      path: "/app/dashboard",
      child_routes: null
    },
    {
      menu_title: "sidebar.report",
      menu_icon: "fa fa-area-chart",
      path: "#",
      child_routes: null
    },
    {
      menu_title: "Seetings",
      menu_icon: "fa fa-cogs",
      path: "#",
      child_routes: null
    }
  ],

  category2: [
    {
      menu_title: "Doctors",
      menu_icon: "fa fa-user-md",
      //"path": "/app/tables/data-table",
      open: false,
      child_routes: [
        {
          path: "/app/tables",
          menu_title: "sidebar.dataTable"
        },
        {
          path: "#",
          menu_title: "Teams"
        },
        {
          path: "#",
          menu_title: "Routes"
        },
        {
          path: "#",
          menu_title: "Pickups"
        },
        {
          path: "#",
          menu_title: "Email"
        },
        {
          path: "#",
          menu_title: "Tax Areas"
        }
      ]
    }
  ],
  category3: [
    {
      menu_title: "Cases",
      menu_icon: "fa fa-folder-open",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Labs",
      menu_icon: "fa fa-flask",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Invoices",
      menu_icon: "fa fa-file-text",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Production",
      menu_icon: "fa fa-wrench",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Products",
      menu_icon: "fa fa-cube",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Quality Control",
      menu_icon: "fa fa-shield",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Connect",
      menu_icon: "fa fa-link",
      path: "#",
      open: false,
      child_routes: null
    },
    {
      menu_title: "Wizard",
      menu_icon: "fa fa-magic",
      path: "#",
      open: false,
      child_routes: null
    }
  ]
};
