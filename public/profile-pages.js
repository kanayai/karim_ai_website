(function () {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "";
  const lightThemes = new Set(["light", "github-light", "solarized-light"]);
  const darkThemes = new Set(["dark", "github-dark", "vscode-dark"]);

  if (lightThemes.has(theme)) {
    document.documentElement.dataset.pageTheme = "light";
  } else if (darkThemes.has(theme)) {
    document.documentElement.dataset.pageTheme = theme;
  }
})();
