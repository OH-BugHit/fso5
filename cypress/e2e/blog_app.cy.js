const baseUrl = 'http://localhost:3003/api'
describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${baseUrl}/testing/reset`)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    beforeEach(function(){
      const user= {
        "username": "tester",
          "name": "Olli Testaa",
            "password": "ofrew49rfzoke4"
      }
      cy.request('POST', `${baseUrl}/users`, user)
    })

    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"').type('tester')
      cy.get('input[name="Password"').type('ofrew49rfzoke4')
      cy.contains('login').click()
      cy.contains('Olli Testaa logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"').type('tester')
      cy.get('input[name="Password"').type('en tiiä')
      cy.contains('login').click()
      cy.contains('invalid username or password')
    })
  })
})