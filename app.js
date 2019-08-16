 //listen for submit
 document.querySelector('#cityform').addEventListener('submit', getCityInfo);

 function getCityInfo(e) {
    //get zip value from input
    const city = document.querySelector('.city').value;
    
    //Make a request
    fetch(`https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json/${city}`)
        .then(response => {
            if(response.status !== 200){
                
             document.querySelector('#output').innerHTML = 
             `                    
             <article class="message"> 
                     <div class="message-body">
                        Invalide city or state, please try again.
                     </div>
             </article>
             `;
             throw Error(response.statusText)
            }
            else{
                showIcon('check');
                return response.json();
            }
        })
        .then(data => {
            
            let output = '';

                   data.forEach(place => {
                    output += `
                    <article class="message"> 
                            <div class="message">
                               <p>Location Info</p>
                               <button class="delete"></button>
                            </div>
                                
                            <div class="message">
                              <ul>
                                 <li><strong>City: </strong>${['city']}</li>
                                 <li><strong>Growth from 2000 to 2013: </strong>${['growth_from_2000_to_2013']}</li>
                                 <li><strong>Longitude: </strong>${['longitude']}</li>
                                 <li><strong>Latitude: </strong>${['latitude']} </li>
                                 <li><strong>Population: </strong>${['population']} </li>
                                 <li><strong>Rank: </strong>${['rank']} </li>
                                 <li><strong>State: </strong>${['state']} </li>
                              </ul>
                            </div>
                    </article>

                    `;
                   });
                   //Insert into output div

                   document.querySelector('#output').innerHTML = output;

        }).catch(error => console.error(error));

     e.preventDefault();
 }