"use strict";
const ul1 = document.getElementById("ul1");
const ul2 = document.getElementById("ul2");
const ul3 = document.getElementById("ul3");
const ul4 = document.getElementById("ul4");
const ul5 = document.getElementById("ul5");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const input4 = document.getElementById("input4");
const input5 = document.getElementById("input5");
const add1 = document.getElementById("add1");
const add2 = document.getElementById("add2");
const add3 = document.getElementById("add3");
const add4 = document.getElementById("add4");
const add5 = document.getElementById("add5");
function getListData(ul) {
  return Array.from(ul.children).map((li) => {
    return {
      text: li.firstChild.textContent, // text của li
      checked: li.querySelector('input[type="checkbox"]').checked, // trạng thái checkbox
    };
  });
}

function save() {
  const json = {
    ul1: getListData(ul1),
    ul2: getListData(ul2),
    ul3: getListData(ul3),
    ul4: getListData(ul4),
    ul5: getListData(ul5),
  };
  localStorage.setItem("lists", JSON.stringify(json));
}
function loadListData(ul, data) {
  ul.innerHTML = ""; // xóa cũ
  data.forEach((item) => {
    const li = document.createElement("li");
    const textNode = document.createTextNode(item.text);
    li.appendChild(textNode);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked; // phục hồi trạng thái
    checkbox.addEventListener("change", save);
    li.appendChild(checkbox);

    const del = document.createElement("button");
    del.name = "delete";
    del.textContent = "X";
    del.addEventListener("click", () => {
      li.remove();
      save();
    });
    li.appendChild(del);

    ul.appendChild(li);
  });
}

// window.onload
window.onload = () => {
  let str = localStorage.getItem("lists");
  if (!str) return;
  const obj = JSON.parse(str);
  loadListData(ul1, obj.ul1);
  loadListData(ul2, obj.ul2);
  loadListData(ul3, obj.ul3);
  loadListData(ul4, obj.ul4);
  loadListData(ul5, obj.ul5);
};

//ham add
function add(x, input) {
  const li = document.createElement("li");
  li.textContent = input.value;
  input.value = "";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", save);
  li.appendChild(checkbox);
  const del = document.createElement("button");
  del.name = "delete";
  del.textContent = "X";
  li.appendChild(del);
  del.addEventListener("click", () => {
    li.remove();
    save();
  });
  x.appendChild(li);
  save();
}
//ham sua
function edit(x) {
  x.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const li = e.target;
      const oltext = li.firstChild.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = oltext;
      li.firstChild.replaceWith(input);

      input.focus();
      input.addEventListener("blur", () => {
        const textNode = document.createTextNode(input.value);
        input.replaceWith(textNode); // chỉ thay text thôi
        save();
      });
      save();
    }
  });
}
add1.onclick = () => add(ul1, input1);
add2.onclick = () => add(ul2, input2);
add3.onclick = () => add(ul3, input3);
add4.onclick = () => add(ul4, input4);
add5.onclick = () => add(ul5, input5);
edit(ul1);
edit(ul2);
edit(ul3);
edit(ul4);
edit(ul5);
