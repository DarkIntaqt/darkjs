(function() {

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


  /*

    ANFANG ALERT

  */

  class InfoClass {
    constructor(name) {
      this.name = name;
      document.body.prepend(new djsObject(name, name).type("section"));
    }
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
    create(html, type, position, ttl) {
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
        case 3:
          this.type = "information";
          break;
        default:
          this.type = "information";
      }

      if (position) {
        if (position === 0) {
          this.position = "center";
        }

        if (position === 1) {
          this.position = "left";
        }

        if (position === 2) {
          this.position = "right";
        }
      } else {
        this.position = "center";
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

      document.getElementById(this.name).appendChild(element);
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
      label.style.margin = "9px 15px";
    }
    updateOut(e) {
      let label = document.getElementById(e.target.id + "-label");
      if (e.target.value.length == 0) {
        label.style.fontSize = "var(--f)";
        label.style.opacity = "1";
        label.style.margin = "17px";
      }
    }
    createStyle(element) {
      console.log(element);
      if (element.parentNode.classList.contains("formarea")) {
        if (!element.getAttribute("id")) {
          this.id = randomId();
          element.setAttribute("id", this.id);
        } else {
          this.id = element.getAttribute("id");
        }
        let label = document.createElement("label");
        label.setAttribute("for", this.id);
        label.innerHTML = element.placeholder;
        label.setAttribute("id", this.id + "-label");
        element.parentNode.insertBefore(label, element);
        element.placeholder = "";
        element.classList.add("styled");
        element.addEventListener("focusin", form.updateIn);
        element.addEventListener("focusout", form.updateOut);
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


  document.addEventListener("DOMContentLoaded", function() {
    window.info = new InfoClass("alertarea");
    window.form = new FormClass();

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
      if (elbounds.width > (bodywidth / 2)) {
        let pattern = document.querySelectorAll("#" + eid + " input[type=\"email\"],#" + eid + " input[type=\"text\"],#" + eid + " input[type=\"password\"]");
        if (pattern.length > 1) {
          for (var i = 0; i < pattern.length; i++) {
            pattern[i].classList.add("multiple");
          }
        }
      }
    }


    // test
    form.createStyle(document.querySelectorAll("input[type=\"email\"]")[0]);
  });

}())