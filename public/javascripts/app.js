const container = document.querySelector('.container')
if (container) {
  container.addEventListener('click', async (e) => {
    if (e.target.matches('.removeBtn')) {
      console.log('-----------<------------------------>');
      const res = await fetch(`/recordings/${e.target.dataset.id}`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        // ---- определить элемент с записью на странице и удалить его через [element].remove()
        const currentNotepad = e.target.closest('.card')
        currentNotepad.remove()
      }
    }
    if (e.target.matches('.editBtn')) {
      const res = await fetch(`/edit/${e.target.dataset.id}`);
      const result = res.json()
      console.log(result);
    }
  })
}
const saveBtn = document.querySelector('.saveButton')

if (saveBtn) {
  saveBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log(12);
    const prepFormData = [...document.forms[0].elements].map(el => [el.name, el.value])
    const formData = Object.fromEntries(prepFormData)
   const id = e.target.dataset.id
    const res = await fetch(`/save/${id}`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      })
      if(res.status == 200 ){
        window.location.replace('/recordings')
      }
    })
  }

