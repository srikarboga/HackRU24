

const p = () => {
    let userdata;
    return fetch('/api/newmodel')
            .then(response => response.json())
            .then(data => {

                userdata = data
                console.log(data.user_id)
            
            })
            .catch(error => console.error('Error:', error));
}

export default p;