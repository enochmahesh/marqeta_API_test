import data from './data.json'
describe('Marqeta APIs Test Automation', () => {   
    var ctoken;
  
    it('Create user',()=>{
        cy.request({
            url:"/users",
            method:"POST",            
            body:data.user,                      
            auth :data.auth
        }).then((resp) => {
                expect(resp.status).to.eq(201)
                cy.log('User creation successful.')
            })

        })

    it('Create Card',()=>{

            cy.request({
                url:"/cards",
                method:"POST",
                body:data.card, 
                auth :data.auth               
               ,}).then((resp) => {
                    expect(resp).property('status').to.equal(201)
                    ctoken= resp.body.token; 
                    cy.log('Card creation successful.')
                    
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
                            
                auth :data.auth,}).then((resp) => {
                expect(resp.status).to.eq(201)  
                cy.log('Transaction created succssfully.')                      
                                
                
                     })
             })
 })