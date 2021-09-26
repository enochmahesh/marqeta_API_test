describe('Marqeta APIs Test Automation', () => {   
    var ctoken;
    it('Create user',()=>{
        cy.request({
            url:"/users",
            method:"POST",
            body:{
                "first_name": "Jane",
                "last_name": "Doe",
                "token": "my_user_01",
                "email": "enoch1@yopmail.com",
                "password": "P@ssw0rd",
                "identifications": [
                  {
                    "type": "SSN",
                    "value": "111234444"
                  }
                ],
                "birth_date": "1991-01-01",
                "address1": "1234 Grove Street",
                "city": "Berkeley",
                "state": "CA",
                "country": "USA",
                "postal_code": "94702",
                "phone": "5105551212",
                "gender": "F",
                "uses_parent_account": false,
                "metadata": {
                  "key1":"value1",
                  "key2": "value2",
                  "notification_email": "enoch1@yopmail.com",
                  "notification_language": "spa",
                  "authentication_question1": "What was your first job?",
                  "authentication_question2": "What make was your first car?",
                  "authentication_question3": "What is your favorite color?",
                  "authentication_answer1": "Cashier",
                  "authentication_answer2": "Trabant",
                  "authentication_answer3": "Blue"
                }
              } ,                
            
            auth :{
                "username": "79822dad-5774-462d-81b4-2a1f843bd019",
                "password": "727d2d91-e188-4424-8761-234262d993fe"
            },}).then((resp) => {
                expect(resp.status).to.eq(201)
            })

        })

        it('Create Card',()=>{

            cy.request({
                url:"/cards",
                method:"POST",
                body:{                    
                        "user_token": "my_user_01",
                        "card_product_token": "034f8d3f-209c-4c94-a294-cda4d6f90c47"
                    }  ,                
                
                auth :{
                    "username": "79822dad-5774-462d-81b4-2a1f843bd019",
                    "password": "727d2d91-e188-4424-8761-234262d993fe"
                },}).then((resp) => {
                    expect(resp).property('status').to.equal(201)
                    ctoken= resp.body.token; 
                    cy.log(ctoken)
                    
                })
                
            })           
                 
                       
                    it('Create Transaction',()=>{
                       
                        cy.request({
                            url:"/simulate/authorization",
                            method:"POST",
                            body:{              
                                    "amount": "10",
                                    "mid": "123456890",
                                    "card_token": ctoken                                                                      
                                },                
                            
                            auth :{
                                "username": "79822dad-5774-462d-81b4-2a1f843bd019",
                                "password": "727d2d91-e188-4424-8761-234262d993fe"
                            },}).then((resp) => {
                                expect(resp.status).to.eq(201)  
                                cy.log('Token for card is :'+ctoken)                      
                                
                
                            })
                        })
                    })    