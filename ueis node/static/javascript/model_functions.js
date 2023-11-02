
const model_function = (payload,route,id,table_id) => {
    var holder = document.getElementById('holder')
    holder.innerText = payload
    var block_id = document.getElementById('block_id')
    block_id.value = id
    var active_id = document.getElementById('active_id')
    active_id = id
    var route_field = document.getElementById('route')
    route_field.value = route
    var table = document.getElementById('table_id')
    table = table_id
}

const block = async () => {
    const status = 'blocked';
    const id = document.getElementById('block_id').value
    const route = document.getElementById('route').value
    var payload = {id,status}

    await fetch(route,
        {
            method:'POST',
            body:JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    ).then((res) => {
        if(res.status == 200){
            var cancel = document.getElementById("cancelBtn")
            cancel.click()
            var table = document.getElementById('table_id')
            table.ajax.reload(null, false);
        }
    })

}

const activate = async () => {
    const status = 'active';
    const id = document.getElementById('active_id').value
    const route = document.getElementById('route').value
    var payload = {id,status}

    await fetch(route,
        {
            method:'POST',
            body:JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    ).then((res) => {
        if(res.status == 200){
            var cancel = document.getElementById("cancelBtn")
            cancel.click()
            var table = document.getElementById('table_id')
            table.ajax.reload(null, false);
        }
    })
}
