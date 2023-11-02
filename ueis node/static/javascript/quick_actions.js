const card_reg_btn = document.getElementById("card_reg_btn");
card_reg_btn.addEventListener('click', async(e) => {
    e.preventDefault()
    var card_id = document.getElementById("card_id").value
    var result = await fetch('/card/add',{method: 'POST'})
    alert('inserted')
})

const third_party_reg_btn = document.getElementById("third_party_reg_btn");
third_party_reg_btn.addEventListener('click', async(e) => {
    try {
        e.preventDefault()
        var comId = document.getElementById("tp_id").value
        var name = document.getElementById("tp_name").value
        var location = document.getElementById("tp_location").value
        var email = document.getElementById("tp_email").value
        var tel = document.getElementById("tp_telephone").value
        var description = document.getElementById("tp_description").value
        console.log(comId)
        var payload = {
            company_id: comId,
            name,
            location,
            email,
            phone:tel,
            description
        }

        await fetch('/third/add',{
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }}).then((res) => {
                if(res.status == 201){
                    var cancel = document.getElementById("third_party_reg_cancel_btn")
                    cancel.click()
                    var table = document.getElementById("thirdparties_table")
                    table.ajax.reload(null, false);
                }
            }).catch((err) => console.error(err.message))


    } catch (error) {
        console.error(error.message)
    }

})

const service_reg_btn = document.getElementById("service_reg_btn")
service_reg_btn.addEventListener('click', async(e) =>{
    try {
        e.preventDefault();

        var name = document.getElementById("service_name").value
        var third_party_id = document.getElementById("service_third-party_id").value
        var description = document.getElementById("service_description").value
        var category = document.getElementById("category").value

        var payload = {
            name,
            third_party_id,
            description,
            category
        }

        await fetch('/service/add',{
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            if(res.status == 201){
                var cancel = document.getElementById("service_reg_cancel_btn")
                    cancel.click()
                var table = document.getElementById("services_table")
                table.ajax.reload(null, false);
            }
        }).catch((err) => console.error(err.message))


    } catch (error) {
        console.error(error.message)
    }

})
