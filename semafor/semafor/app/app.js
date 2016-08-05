(function () {
  var myId;

  function Note(title, content) {
    this.Title = title;
    this.Content = content;
    this.Time = Date().toString();
    this.Id = _.uniqueId();
  };

  Note.prototype.CreateNote = function () {
    var note = document.createElement("div");
    note.className = "col-sm-4 margin";
    var panel = document.createElement("div");
    panel.className = "panel panel-default";
    panel.style.height = "100%";
    panel.style.width = "100%";
    panel.style.border = "1px solid grey";
    var heading = document.createElement("div");
    heading.className = "panel-body headingcolor";
    heading.setAttribute("id", "heading" + this.Id);
    heading.textContent = this.Title;
    var body = document.createElement("div");
    body.className = "panel-body";
    body.setAttribute("id", "bodyContainer" + this.Id);
    body.style.overflow = "hidden";
    body.style.position = "relative";
    body.style.height = "73%";
    body.style.width = "92%";
    body.textContent = this.Content;
    body.innerHTML += '<br/><br/>';

    var restorecontainer = document.createElement("div");
    restorecontainer.className = "restoreContainer";

    var restore = document.createElement("span");
    restore.className = "glyphicon glyphicon-refresh pull-right";
    restore.setAttribute("id", "restore" + this.Id);
    restore.style.position = "absolute";
    restore.style.top = "2%";
    restore.setAttribute("data-toggle", "modal");
    restore.setAttribute("data-target", "#restoreModal");
    restore.setAttribute("onclick", "getId(this)");

    restorecontainer.appendChild(restore);
    body.appendChild(restorecontainer);

    var traffic = document.createElement("div");
    traffic.className = "trafficlight";
    var red = document.createElement("div");
    red.className = "light";
    red.style.top = "10%";
    red.setAttribute("id", "red" + this.Id);
    var yellow = document.createElement("div");
    yellow.className = "light";
    yellow.style.top = "50%";
    yellow.setAttribute("id", "yellow" + this.Id);
    var green = document.createElement("div");
    green.className = "light";
    green.style.top = "90%";
    green.setAttribute("id", "green" + this.Id);
    green.style.background = "lime";

    traffic.appendChild(red);
    traffic.appendChild(green);
    traffic.appendChild(yellow);
    panel.appendChild(traffic);
    note.setAttribute("id", this.Id);
    note.style.height = "25%";
    note.style.width = "80%";
    note.style.left = "10%";

    panel.appendChild(heading);
    panel.appendChild(body);
    note.appendChild(panel);
    document.getElementById("container").appendChild(note);

    setTimeout(function () {
      ChangeLight(note.id, green, yellow, red);
    } , 4000);
  };

  var btn = document.getElementById("saveButton");
  btn.addEventListener("click", AddNote);

  function ChangeLight(currentId, light1, light2, light3) {
    light1.style.background = "grey";
    if (light1.id == "green" + currentId) {
      light2.style.background = "yellow";
      setTimeout(function () {
        ChangeLight(currentId, light2, light3, light1);
      }, 6000);
    }
    else
      if (light1.id == "yellow" + currentId) {
        light2.style.background = "red";
        setTimeout(function () {
          ChangeLight(currentId, light2, light3, light1);
        }, 10000);
      }
      else
        if (light1.id == "red" + currentId) {
          document.getElementById("container").removeChild(document.getElementById(currentId));
        }
  };

  document.getElementById("restoreYes").onclick = function () {
    console.log(this.parentElement);
  };

  function getId(that) {
    console.log(that);
  };

  function AddNote() {
    if (CheckNote("notename", "notecontent")) {
      var note = new Note(document.getElementById("notename").value, document.getElementById("notecontent").value);
      note.CreateNote();
      console.log(note.Time);
      return false;
    }
    return true;
  };
  
  function CheckNote(nameId, contentId) {
    if(document.getElementById(nameId).value=="" || document.getElementById(contentId).value == "")
      return false;
    return true;
  };

})();