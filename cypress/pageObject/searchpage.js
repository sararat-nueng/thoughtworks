import cypressConfig from "../../cypress.config";
import testdata from "../fixtures/testdata.json"

class searchPage{
    Element = {
        Header2:() => cy.get("h2"),
        btnSearch: () => cy.get('input[type="submit"]'),
        txtPromocode: () => cy.get('#promotional_code'),
        linkBack: () => cy.get("a[href='javascript:window.history.go(-1)']"),
        selectDeparture: () => cy.get('select#departing'),
        selectArraival: () => cy.get('select#returning'),
        msgResult: () => cy.get('#content').first(),
        option: ['Select...','July','December','July (next year)','December (next year)','July (two years from now)','December (two years from now)'],
        
    
        
    }
    
    selectOptionthenVerifySeachResult(){
        this.Element.option.forEach((valueDeparture,indexDeparture) =>{
            this.Element.option.forEach((valueArraival,indexArraival)=>{
                this.Element.selectDeparture().select(valueDeparture)
                this.Element.selectArraival().select(valueArraival)
                this.clickSearch()
                cy.log('Performing with checking the message after clicking search.')
                this.verifySearchResult(indexDeparture,indexArraival)
                this.clickonBackLink()
            })
               
        })

    }

    verifySearchResult(indexDeparture,indexArraival){

        //[Normal Case] Actual Result: "Seats available!","Sorry, there are no more seats available."
        if(indexArraival - indexDeparture >= 2){
            this.Element.msgResult().should(($element) => {
                const text = $element.text();
                expect(text.includes(testdata.searchResultPage.seatStatusAvaliable) || text.includes(testdata.searchResultPage.seatStatusNotAvaliable)||text.includes(testdata.searchResultPage.seatStatusUnfortunately)).to.be.true;
              });
        }

        //[Arraival before Departure]  Actual Result:"Unfortunately, this schedule is not possible. Please try again."
        else if(indexArraival - indexDeparture <= 0){
            this.Element.msgResult().should(($element) => {
                const text = $element.text();
                expect(text.includes(testdata.searchResultPage.seatStatusAvaliable) || text.includes(testdata.searchResultPage.seatStatusNotAvaliable)||text.includes(testdata.searchResultPage.seatStatusUnfortunately)).to.be.true;
              });
        }

        //[Arraival less than 1 year from Departure ]  Actual Result:"Unfortunately, this schedule is not possible. Please try again."
        else if(indexArraival - indexDeparture == 1){
            this.Element.msgResult().should(($element) => {
                const text = $element.text();
                expect(text.includes(testdata.searchResultPage.seatStatusAvaliable) || text.includes(testdata.searchResultPage.seatStatusNotAvaliable)||text.includes(testdata.searchResultPage.seatStatusUnfortunately)).to.be.true;
              });
        }


    }

    clickSearch(){
            this.Element.btnSearch().should('be.visible')
            this.Element.btnSearch().click()
            cy.log("Click Serach and verify search button is visible")

    }

    typePromocode(promocode){
        this.Element.txtPromocode().should('be.visible')
        this.Element.txtPromocode().type(promocode)
    }

    clickonBackLink(){
        this.Element.linkBack().click()
        this.Element.Header2().should("have.text",testdata.header2)

    }
}
export default searchPage;