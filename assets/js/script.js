const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const productName = document.querySelector('#productName');
const productDesc = document.querySelector('#productDesc');
const productPrice = document.querySelector('#productPrice');
const saveButton = document.querySelector('#saveButton');

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = (e) => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    productName.value = itens[index].nome;
    productDesc.value = itens[index].descricao;
    productPrice.value = itens[index].valor;
    id = index;
  } else {
    productName.value = '';
    productDesc.value = '';
    productPrice.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensDB();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td class="actionButton">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="actionButton">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

saveButton.onclick = (e) => {
  if (productName.value == '' || productDesc.value == '' || productPrice.value == ''){
    return;
  }
  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = productName.value;
    itens[id].descricao = productDesc.value;
    itens[id].valor = productPrice.value;
  } else {
    itens.push({
      nome: productName.value,
      descricao: productDesc.value,
      valor: productPrice.value,
    });
  }
  setItensDB();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensDB();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensDB = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensDB = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();