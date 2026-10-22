export default defineAppConfig({
  ui: {
    colors: {
      // Admin default direction (framed sheet): a teal-cyan accent. Still fully live-themeable —
      // UserMenu's "Theme" picker reassigns appConfig.ui.colors.primary to any Tailwind colour.
      primary: "cyan",
      neutral: "gray",
    },
    // "Framed sheet" admin shell (references/app-screens.md §3.1): the panel sits as a white sheet
    // inset from the window's right/bottom edges only, floating on the tinted frame behind it.
    // Mobile stays edge-to-edge — the frame drops away below `lg`, as the style's phone rule asks.
    dashboardPanel: {
      slots: {
        root: "lg:mr-2 lg:mb-2 lg:rounded-2xl lg:border lg:border-(--admin-sheet-border) bg-(--admin-sheet-bg) lg:overflow-hidden",
      },
    },
    icons: {
      arrowDown: "i-ph-arrow-down",
      arrowLeft: "i-ph-arrow-left",
      arrowRight: "i-ph-arrow-right",
      arrowUp: "i-ph-arrow-up",
      caution: "i-ph-warning-circle",
      check: "i-ph-check",
      chevronDoubleLeft: "i-ph-caret-line-left",
      chevronDoubleRight: "i-ph-caret-line-right",
      chevronDown: "i-ph-caret-down",
      chevronLeft: "i-ph-caret-left",
      chevronRight: "i-ph-caret-right",
      chevronUp: "i-ph-caret-up",
      close: "i-ph-x",
      copy: "i-ph-clipboard",
      copyCheck: "i-ph-check",
      dark: "i-ph-moon",
      drag: "i-ph-dots-six-vertical",
      ellipsis: "i-ph-dots-three",
      error: "i-ph-x-circle",
      external: "i-ph-arrow-square-out",
      eye: "i-ph-eye",
      eyeOff: "i-ph-eye-slash",
      file: "i-ph-file",
      folder: "i-ph-folder",
      folderOpen: "i-ph-folder-open",
      hash: "i-ph-hash",
      info: "i-ph-info",
      light: "i-ph-sun",
      loading: "i-ph-spinner-gap",
      menu: "i-ph-list",
      minus: "i-ph-minus",
      panelClose: "i-ph-caret-left",
      panelOpen: "i-ph-caret-right",
      plus: "i-ph-plus",
      reload: "i-ph-arrow-counter-clockwise",
      search: "i-ph-magnifying-glass",
      stop: "i-ph-stop",
      star: "i-ph-star",
      success: "i-ph-check-circle",
      system: "i-ph-desktop",
      tip: "i-ph-lightbulb",
      upload: "i-ph-upload-simple",
      warning: "i-ph-warning",
    },
  },
});
