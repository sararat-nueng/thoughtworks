import cypressConfig from "../../cypress.config";
import testdata from "../fixtures/testdata.json"

class homePage{
    Element = {
        header1: () => cy.get('h1'),
        header2: () => cy.get('h2'),
        header3: () => cy.get('h3'),
       
    }

    checkHomePageHeader(){
        this.Element.header1().should('be.visible')
        this.Element.header1().should('have.text',testdata.header1)
        this.Element.header2().should('be.visible')
        this.Element.header2().should('have.text',testdata.header2)
        this.Element.header3().should('be.visible')
        this.Element.header3().should('have.text',testdata.header3)

    }
    
    
}
export default homePage;