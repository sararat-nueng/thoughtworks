import BaseUrl from "../support/baseUrl"
import searchPage from "../pageObject/searchpage"
import homePage from "../pageObject/homepage"

const homepage = new homePage()
const searchpage = new searchPage()
const baseurl = new BaseUrl()

describe('testing airMars seraching', () => {

  before(function(){
    cy.visit(baseurl.marAirUrl)
  })

  it('seraching incorrect return Date', () => {
    homepage.checkHomePageHeader()
    searchpage.typePromocode('AF3-FJK-418')
    searchpage.selectOptionthenVerifySeachResult()
  })
})