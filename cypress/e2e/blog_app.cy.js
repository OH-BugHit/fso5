describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        "username": "tester",
        "name": "Olli Testaa",
        "password": "ofrew49rfzoke4"
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    })

    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"').type('tester')
      cy.get('input[name="Password"').type('ofrew49rfzoke4')
      cy.contains('login').click()
      cy.contains('Olli Testaa logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"').type('tester')
      cy.get('input[name="Password"').type('en tiiä')
      cy.contains('login').click()
      cy.get('.error').contains('invalid username or password')

      cy.contains('Olli Testaa logged in').should('not.exist')
    })
    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'tester', password: 'ofrew49rfzoke4' })
      })

      it('a new blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('input[name="title"]').type('Blogin title')
        cy.get('input[name="author"').type('Blogin author')
        cy.get('input[name="url"').type('Blogin URL')
        cy.get('.createButton').click()
        cy.get('.success').contains('a new blog "Blogin title" by Blogin author, added')
        cy.contains('Blogin title Blogin author')
      })
    })
  })
})