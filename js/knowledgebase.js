// ---------------------------------------------------------------------------
// Renders the Knowledgebase from js/kb-data.js. One script drives three views:
//   * #kbCategories -> the category card grid (home)
//   * #kbCategory   -> a category's article list  (category.html?id=...)
//   * #kbArticle    -> a single article           (article.html?id=...)
// ---------------------------------------------------------------------------

(function () {
  var cats = window.KB_CATEGORIES || [];
  var byCat = {};
  var byArticle = {};
  cats.forEach(function (c) {
    byCat[c.id] = c;
    (c.articles || []).forEach(function (a) {
      byArticle[a.id] = { article: a, cat: c };
    });
  });

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function articles(c) {
    return c.articles || [];
  }

  // --- home: category cards -------------------------------------------------
  var home = document.getElementById("kbCategories");
  if (home) {
    home.innerHTML = cats
      .map(function (c) {
        var n = articles(c).length;
        return (
          '<div class="column is-one-third-desktop is-half-tablet is-full-mobile kb-card">' +
          '<a class="card kb-card-link" href="category.html?id=' + encodeURIComponent(c.id) + '">' +
          '<div class="card-content">' +
          '<div style="display:flex;"><img src="img/syn_small_white.png" alt="' + esc(c.title) +
          '" style="margin:auto;" height="70" width="70"/></div>' +
          '<h5 class="title is-5 mt-4 mb-0" style="text-align:center;font-weight:bold;">' + esc(c.title) + "</h5>" +
          '<h5 class="subtitle is-5 mt-1" style="text-align:center;font-weight:lighter;font-size:12pt;">' +
          esc(c.description) + "</h5>" +
          '<div style="display:flex;"><span style="margin:auto;font-weight:bold;">' +
          n + " article" + (n === 1 ? "" : "s") + "</span></div>" +
          "</div></a></div>"
        );
      })
      .join("");

    var search = document.getElementById("kbSearch");
    if (search) {
      var cards = Array.prototype.slice.call(home.querySelectorAll(".kb-card"));
      search.addEventListener("input", function () {
        var q = search.value.trim().toLowerCase();
        cards.forEach(function (col) {
          col.style.display = col.textContent.toLowerCase().indexOf(q) !== -1 ? "" : "none";
        });
      });
    }
  }

  // --- category: article list ----------------------------------------------
  var catRoot = document.getElementById("kbCategory");
  if (catRoot) {
    var c = byCat[param("id")];
    if (!c) {
      catRoot.innerHTML =
        '<div class="notification is-warning is-light">Category not found. ' +
        '<a href="index.html">Back to the Knowledgebase</a>.</div>';
    } else {
      document.title = c.title + " - Synapse Support";
      var rows =
        articles(c)
          .map(function (a) {
            return (
              '<a class="panel-block" href="article.html?id=' + encodeURIComponent(a.id) + '">' +
              '<span class="panel-icon"><iconify-icon icon="mdi:file-document-outline"></iconify-icon></span>' +
              esc(a.title) + "</a>"
            );
          })
          .join("") || '<div class="panel-block has-text-grey">No articles here yet.</div>';
      catRoot.innerHTML =
        '<nav class="breadcrumb" aria-label="breadcrumbs"><ul>' +
        '<li><a href="index.html">Knowledgebase</a></li>' +
        '<li class="is-active"><a aria-current="page">' + esc(c.title) + "</a></li></ul></nav>" +
        '<h2 class="title is-3">' + esc(c.title) + "</h2>" +
        '<p class="subtitle is-5 has-text-grey">' + esc(c.description) + "</p>" +
        '<nav class="panel">' + rows + "</nav>";
    }
  }

  // --- article --------------------------------------------------------------
  var artRoot = document.getElementById("kbArticle");
  if (artRoot) {
    var found = byArticle[param("id")];
    if (!found) {
      artRoot.innerHTML =
        '<div class="notification is-warning is-light">Article not found. ' +
        '<a href="index.html">Back to the Knowledgebase</a>.</div>';
    } else {
      var a = found.article;
      var cat = found.cat;
      document.title = a.title + " - Synapse Support";
      var body = a.body || "";
      if (window.DOMPurify) body = DOMPurify.sanitize(body, { USE_PROFILES: { html: true } });
      artRoot.innerHTML =
        '<nav class="breadcrumb" aria-label="breadcrumbs"><ul>' +
        '<li><a href="index.html">Knowledgebase</a></li>' +
        '<li><a href="category.html?id=' + encodeURIComponent(cat.id) + '">' + esc(cat.title) + "</a></li>" +
        '<li class="is-active"><a aria-current="page">' + esc(a.title) + "</a></li></ul></nav>" +
        '<h1 class="title is-3">' + esc(a.title) + "</h1>" +
        '<div class="content">' + body + "</div>" +
        '<hr/><a href="category.html?id=' + encodeURIComponent(cat.id) + '">&larr; Back to ' +
        esc(cat.title) + "</a>";
    }
  }
})();
