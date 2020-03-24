var ApiUtils = {  
    checkStatus: function(response) {
      // console.log("response data "+JSON.stringify(response))
      if (response.ok && response.status == 200) {
        // console.log("response ok "+response)
        return response
      } else {
        let error = new Error(response.statusText);
        // console.log("response ok "+error)
        error.response = response;
        console.log("error api util ",ApiUtils)
        throw error;
      }
    }
  };
  export { ApiUtils as default };