

var ApiUtils = {  
    checkStatus: function(response) {
      // console.log("response data "+JSON.stringify(response))
      if (response.ok && response.status == 200) {
        console.log("response ok "+response)
        return response
      } else {
        let error = new Error(response.statusText);
        console.log("response error "+error)
        error.response = response;
        // console.log("error api util ",ApiUtils)
        throw error;
      }
    }
  };

const fetchApi = async(url)=> {
    try {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(ApiUtils.checkStatus)
            .then((response) => response.json())
            .catch(e => e)
    } catch (error) {
        return error;
    }
}


export default fetchApi

