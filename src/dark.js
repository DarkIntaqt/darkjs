(function() {

  /*

    2021 - DARKINTAQT.COM

  */
  let csslocation = "https://darkintaqt.com/css/dark.css"; // Location of the dark.css file

  class djsObject {
    constructor(cssclass, id) {
      this.class = cssclass;
      this.id = id;
    }
    type(type) {
      this.el = document.createElement(type);
      this.el.classList.add("djs");
      this.el.classList.add(this.class);
      if (this.id) {
        this.el.setAttribute("id", this.id);
      }
      return this.el;
    }
  }

  function randomId() {
    let tempid = Math.floor(Math.random() * 9999999);
    while (document.getElementById("djs" + tempid)) {
      tempid++;
    }
    return "djs" + tempid;
  }

  function executeAfterLoading(callback) {
    if (document.readyState == "complete") {
      return callback;
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  /*

    ANFANG ALERT

  */

  class InfoClass {
    close(element) {

      let parent = element.parentNode;
      if (parent.classList.contains("info")) {
        element.setAttribute("onclick", "");
        parent.style.transition = ".25s opacity";
        parent.style.opacity = "0";
        setTimeout(function() {
          parent.remove();
        }, 250);

      }
    }
    create(html, type = INFO, position = RIGHT, ttl = 0) {
      if (!this.executedbefore) {
        this.executedbefore = true;
        executeAfterLoading(function() {
          document.body.prepend(new djsObject("alertarea", "alertarea").type("section"))
        });
      }
      let element = new djsObject("info").type("div");

      switch (type) {
        case 0:
          this.type = "warning";
          break;
        case 1:
          this.type = "success";
          break;
        case 2:
          this.type = "error";
          break;
        default:
          this.type = "information";
      }


      if (position === 0) {
        this.position = "center";
      }

      if (position === 1) {
        this.position = "left";
      }

      if (position === 2) {
        this.position = "right";
      }

      element.classList.add(this.type);
      element.classList.add(this.position);


      let elementp = document.createElement("p");
      elementp.innerHTML = html;
      element.appendChild(elementp);

      let elementbutton = document.createElement("button");
      elementbutton.setAttribute("onclick", "info.close(this)");

      element.appendChild(elementbutton);

      if (ttl) {
        let ttlelement = document.createElement("div");
        ttlelement.classList.add("ttlelement");
        ttlelement.style.transition = ttl + "s linear";
        setTimeout(function() {
          ttlelement.style.width = "1px";
        }, 1);
        element.appendChild(ttlelement);
        setTimeout(function() {
          info.close(elementbutton);
        }, ttl * 1000);
      }

      executeAfterLoading(function() {
        document.getElementById("alertarea").appendChild(element);
      });
    }
  }

  /*

    END ALERT

  */

  class FormClass {
    updateIn(e) {
      let label = document.getElementById(e.target.id + "-label");
      label.style.fontSize = "11px";
      label.style.opacity = "0.5";
      label.style.margin = "4px 10px";
    }
    updateOut(e) {
      let label = document.getElementById(e.target.id + "-label");
      if (e.target.value.length == 0) {
        label.style.fontSize = "var(--f)";
        label.style.opacity = "1";
        label.style.margin = "13px";
      }
    }
    beautify(element) {
      if (element == true) {
        let elements = document.querySelectorAll(".djs.formarea input");
        for (var i = 0; i < elements.length; i++) {
          form.beautify(elements[i]);
        }
      } else {
        if (element.parentNode.classList.contains("formarea") && (element.type === "password" || element.type === "email" || element.type === "text")) {
          if (!element.getAttribute("id")) {
            this.id = randomId();
            element.setAttribute("id", this.id);
          } else {
            this.id = element.getAttribute("id");
          }
          let floatingdiv = new djsObject("floating-input", "djs-f-" + randomId()).type("div");

          element.before(floatingdiv);

          let label = document.createElement("label");
          label.setAttribute("for", this.id);
          label.innerHTML = element.placeholder;
          label.setAttribute("id", this.id + "-label");
          floatingdiv.appendChild(element);
          floatingdiv.insertBefore(label, element);
          element.placeholder = "";
          element.classList.add("styled");
          element.addEventListener("focusin", form.updateIn);
          element.addEventListener("focusout", form.updateOut);
        }
      }
    }
  }

  window.CENTER = 0;
  window.LEFT = 1;
  window.RIGHT = 2;
  window.WARNING = 0;
  window.SUCCESS = 1;
  window.ERROR = 2;
  window.INFO = 3;
  window.ALL = true;

  window.form = new FormClass();
  window.info = new InfoClass();

  let darkcss = document.createElement("link");
  darkcss.href = csslocation;
  darkcss.rel = "stylesheet";
  document.head.appendChild(darkcss);

  document.addEventListener("DOMContentLoaded", function() {
    /*

      STYLE FORMS

    */
    let bodywidth = document.body.getBoundingClientRect()["width"];
    let formareas = document.getElementsByClassName('formarea');
    for (var i = 0; i < formareas.length; i++) {
      let element = formareas[i];
      let elbounds = element.getBoundingClientRect();
      let eid = "";
      if (!element.getAttribute("id")) {
        eid = randomId();
        element.setAttribute("id", eid);
      } else {
        eid = element.getAttribute("id");
      }
      if (elbounds.width > (bodywidth / 2) && bodywidth > 700) {
        let pattern = document.querySelectorAll("#" + eid + " input[type=\"email\"],#" + eid + " input[type=\"text\"],#" + eid + " input[type=\"password\"]");
        if (pattern.length > 1) {
          for (var i = 0; i < pattern.length; i++) {
            if (pattern[i].parentNode.classList.contains("floating-input")) {
              pattern[i].parentNode.classList.add("multiple");
            } else {
              pattern[i].classList.add("multiple");
            }
          }
        }
      }
    }
  });
}())