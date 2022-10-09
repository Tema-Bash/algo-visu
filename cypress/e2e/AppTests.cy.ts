/*describe('app has been launched and routing worked correctly', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('All pages opened', function() {
    cy.get('a').each((el:HTMLLinkElement) :void => {
      const href = el[0].href;
     cy.visit(`${href}`);
    }) 
  });
})*/
/*
describe('string work correctly', () => {
  beforeEach(function() {
    cy.visit('//recursion');
  });

  it('если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="submit"]').should('be.disabled')
  });

  it('строка разворачивается корректно', function() {
    cy.get('[data-cy="input"]').type('abcd').should('have.value', 'abcd')
    cy.clock();
    cy.get('[data-cy="submit"]').click()
    // С С С С -->  A B C D
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `a`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if (i===1){
        cy.wrap(el).should('have.text', `b`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if (i===2){
        cy.wrap(el).should('have.text', `c`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if (i===3){
        cy.wrap(el).should('have.text', `d`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }
    })

    cy.tick(1000);
    // Ф С С Ф -->  A B C D
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `a`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }else if (i===1){
        cy.wrap(el).should('have.text', `b`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if (i===2){
        cy.wrap(el).should('have.text', `c`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if (i===3){
        cy.wrap(el).should('have.text', `d`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }
    })

    cy.tick(1000);
    // З Ф Ф З -->  D B C A
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `d`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      }else if (i===1){
        cy.wrap(el).should('have.text', `b`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }else if (i===2){
        cy.wrap(el).should('have.text', `c`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }else if (i===3){
        cy.wrap(el).should('have.text', `a`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      }
    })

    cy.tick(1000);
    // З З З З -->  D C B A
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `d`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      }else if (i===1){
        cy.wrap(el).should('have.text', `c`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      }else if (i===2){
        cy.wrap(el).should('have.text', `b`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      }else if (i===3){
        cy.wrap(el).should('have.text', `a`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      }
    })
  });
})*/

/*describe('fibbonachi work correctly', () => {
  beforeEach(function() {
    cy.visit('//fibonacci');
  });

  it('если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="submit"]').should('be.disabled')
  });

  it('числа генерируются корректно', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', '3')
    cy.clock();
    cy.get('[data-cy="submit"]').click()
    // 0
    cy.get('[data-cy="circle"]').should('have.length','1')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`)
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`)
      }
    })

    cy.tick(1000);
    // 0 1
    cy.get('[data-cy="circle"]').should('have.length','2')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`)
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`)
      }
    })

    cy.tick(1000);
    // 0 1 1
    cy.get('[data-cy="circle"]').should('have.length','3')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`)
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`)
      }else if (i===2){
        cy.wrap(el).should('have.text', `1`)
      }
    })

    cy.tick(1000);
    // 0 1 1 2
    cy.get('[data-cy="circle"]').should('have.length','4')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`)
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`)
      }else if (i===2){
        cy.wrap(el).should('have.text', `1`)
      }else if (i===3){
        cy.wrap(el).should('have.text', `2`)
      }
    })
  });
})*/


//circle-container
//button-add
//button-pop
//button-clear

describe('stack work correctly', () => {
  beforeEach(function() {
    cy.visit('//stack');
  });

  it('если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="button-add"]').should('be.disabled')
  });

  it('Проверьте правильность добавления элемента в стек.', function() {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3")
    cy.clock()

    cy.get('[data-cy="button-add"]').click()
    cy.get('[data-cy="circle"]').should('have.length','1')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }
    })

    cy.tick(1000) 
    cy.get('[data-cy="button-add"]').click()
    cy.get('[data-cy="circle"]').should('have.length','2')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }
    })

    cy.tick(1000) 
    cy.get('[data-cy="button-add"]').click()
    cy.get('[data-cy="circle"]').should('have.length','3')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }
    })

    cy.tick(1000) 
    cy.get('[data-cy="button-add"]').click()
    cy.get('[data-cy="circle"]').should('have.length','4')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===3){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      }
    })

    cy.tick(1000) 
    cy.get('[data-cy="circle"]').should('have.length','4')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===3){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }
    })
  });

  it('Проверить правильность удаления элемента из стека', () => {
    cy.get('[data-cy="button-pop"]').click()
    cy.get('[data-cy="circle"]').should('have.length','3')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`)
        cy.wrap(el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      }
    })
  });
})