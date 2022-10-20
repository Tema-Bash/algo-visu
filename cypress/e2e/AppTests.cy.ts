import {HAVE_CSS, BORDER_COLOR, RGB_0_50_255, RGB_210_82_225, RGB_127_224_81} from './e2eContsts'

describe('app has been launched and routing worked correctly', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('All pages opened', function() {
    cy.get('a').each((el:any ) :void => {
      const href = el[0].href;
     cy.visit(`${href}`);
    }) 
  });
})

describe('string work correctly', () => {
  beforeEach(function() {
    cy.visit('//recursion');
  });

  it('if the input is empty, then the add button is not available', function() {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('string expands correctly', function() {
    cy.get('[data-cy="input"]').type('abcd').should('have.value', 'abcd');
    cy.clock();
    cy.get('[data-cy="submit"]').click();
    // С С С С -->  A B C D
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `a`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if (i===1){
        cy.wrap(el).should('have.text', `b`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if (i===2){
        cy.wrap(el).should('have.text', `c`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if (i===3){
        cy.wrap(el).should('have.text', `d`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }
    })

    cy.tick(1000);
    // Ф С С Ф -->  A B C D
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `a`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }else if (i===1){
        cy.wrap(el).should('have.text', `b`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if (i===2){
        cy.wrap(el).should('have.text', `c`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if (i===3){
        cy.wrap(el).should('have.text', `d`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })

    cy.tick(1000);
    // З Ф Ф З -->  D B C A
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `d`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
      }else if (i===1){
        cy.wrap(el).should('have.text', `b`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }else if (i===2){
        cy.wrap(el).should('have.text', `c`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }else if (i===3){
        cy.wrap(el).should('have.text', `a`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
      }
    })

    cy.tick(1000);
    // З З З З -->  D C B A
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `d`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
      }else if (i===1){
        cy.wrap(el).should('have.text', `c`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
      }else if (i===2){
        cy.wrap(el).should('have.text', `b`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
      }else if (i===3){
        cy.wrap(el).should('have.text', `a`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
      }
    })
  });
})

describe('fibbonachi work correctly', () => {
  beforeEach(function() {
    cy.visit('//fibonacci');
  });

  it('if the input is empty, then the add button is not available', function() {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('numbers are generated correctly', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', '3');
    cy.clock();
    cy.get('[data-cy="submit"]').click();
    // 0
    cy.get('[data-cy="circle"]').should('have.length','1');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`);
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`);
      }
    })

    cy.tick(1000);
    // 0 1
    cy.get('[data-cy="circle"]').should('have.length','2')
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`);
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`);
      }
    })

    cy.tick(1000);
    // 0 1 1
    cy.get('[data-cy="circle"]').should('have.length','3');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`);
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`);
      }else if (i===2){
        cy.wrap(el).should('have.text', `1`);
      }
    })

    cy.tick(1000);
    // 0 1 1 2
    cy.get('[data-cy="circle"]').should('have.length','4');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`);
      }else if (i===1){
        cy.wrap(el).should('have.text', `1`);
      }else if (i===2){
        cy.wrap(el).should('have.text', `1`);
      }else if (i===3){
        cy.wrap(el).should('have.text', `2`);
      }
    })
  });
})

describe('stack work correctly', () => {
  beforeEach(function() {
    cy.visit('//stack');
  });

  it('if the input is empty, then the add button is not available', function() {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="button-add"]').should('be.disabled');
  });

  it('Adding elements to the stack.', function() {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3");
    cy.clock();

    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="circle"]').should('have.length','1');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })

    cy.tick(1000);
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="circle"]').should('have.length','2');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })

    cy.tick(1000);
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="circle"]').should('have.length','3');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })

    cy.tick(1000) ;
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="circle"]').should('have.length','4');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===3){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })

    cy.tick(1000) 
    cy.get('[data-cy="circle"]').should('have.length','4');
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===2){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===3){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }
    })
  });

  it('removing an element from the stack', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3");
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="circle"]').should('have.length','3');
    cy.clock();
    cy.get('[data-cy="button-pop"]').click();
    cy.tick(1000) ;
    cy.get('[data-cy="circle"]').should('have.length','2');
  });

  it('clear button works correctly', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3");
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="button-add"]').click();
    cy.get('[data-cy="circle"]').should('have.length','3');
    cy.clock();
    cy.get('[data-cy="button-clear"]').click();
    cy.tick(1000) ;
    cy.get('[data-cy="circle"]').should('have.length','0');
  });
})

describe('queue work correctly',()=>{
  beforeEach(function() {
    cy.visit('//queue');
  });

  it('if the input is empty, then the add button is not available', function() {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="button-enqueue"]').should('be.disabled');
  });

  it('Adding elements to the queue', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3");
    cy.get('[data-cy=button-enqueue]').click();
    cy.clock();
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })
    cy.tick(1000); 

    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="tail"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should('have.text' ,'tail');
      }
    })
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }
    })

    cy.get('[data-cy=button-enqueue]').click();

    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }else if(i===1){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })
    cy.tick(1000); 

    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="tail"]').each((el,i)=>{
      if(i===2){
        cy.wrap(el[0]).should('have.text' ,'tail');
      }
    })
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      } else if(i===1){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      } 
    })
  });

  it('removing an element from the queue', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3");
    cy.get('[data-cy=button-enqueue]').click();
    cy.clock();
    cy.tick(1000);
    cy.get('[data-cy=button-enqueue]').click();
    cy.tick(1000);
    cy.get('[data-cy=button-dequeue]').click();
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `3`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
      }
    })
    cy.tick(1000);
    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="tail"]').each((el,i)=>{
      if(i===2){
        cy.wrap(el[0]).should('have.text' ,'tail');
      }
    })
  });

  it('clear button works correctly', () => {
    cy.get('[data-cy="input"]').type('3').should('have.value', "3")
    cy.get('[data-cy=button-enqueue]').click();
    cy.clock();
    cy.tick(1000);
    cy.get('[data-cy=button-enqueue]').click();
    cy.tick(1000);
    cy.get('[data-cy=button-enqueue]').click();
    cy.tick(1000);
    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="circle"]').contains('3').should('have.length', 0);
  });
})

describe('list work correctly',()=>{
  beforeEach(function() {
    cy.visit('//list');
  });

  it('if the input is empty, then the add button is not available', function() {
    cy.get('[data-cy="inputValue"]').clear();
    cy.get('[data-cy="inputIndex"]').clear();
    cy.get('[data-cy="addToHead"]').should('be.disabled');
    cy.get('[data-cy="addToTail"]').should('be.disabled');
    cy.get('[data-cy="addByIndex"]').should('be.disabled');
  });

  it('default list render is correct', () => {
    cy.get('[data-cy="circle"]').each((el,i) => {
      if(i===0){
        cy.wrap(el).should('have.text', `0`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      } else if(i===1){
        cy.wrap(el).should('have.text', `34`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      } else if(i===2){
        cy.wrap(el).should('have.text', `8`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      } else if(i===3){
        cy.wrap(el).should('have.text', `1`);
        cy.wrap(el).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
      }
    })
    cy.get('[data-cy="circle"]').should('have.length', 4);
  });

  it('add element to head', () => {
    cy.clock();
    cy.get('[data-cy="inputValue"]').type('3').should('have.value', '3');
    cy.get('[data-cy="addToHead"]').click();
    cy.get('[data-cy="circle-container"] [data-cy="head"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'3');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'0');
      }
    })

    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
        cy.wrap(el[0]).should('have.text' ,'3');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })

    cy.tick(2000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
        cy.wrap(el[0]).should('have.text' ,'3');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })
  });

  it('add element to tail', () => {
    cy.clock();
    cy.get('[data-cy="inputValue"]').type('3').should('have.value', '3');
    cy.get('[data-cy="addToHead"]').click();
    cy.get('[data-cy="circle-container"] [data-cy="head"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'3');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'0');
      }
    })

    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
        cy.wrap(el[0]).should('have.text' ,'3');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })

    cy.tick(2000);
    
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
        cy.wrap(el[0]).should('have.text' ,'3');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="head"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should('have.text' ,'head');
      }
    })
  });

  it('add by index', () => {
    cy.clock();
    cy.get('[data-cy="inputValue"]').type('5').should('have.value', '5');
    cy.get('[data-cy="inputIndex"]').type('1').should('have.value', '1');
    cy.get('[data-cy="addByIndex"]').click()
    cy.get('[data-cy="circle-container"] [data-cy="head"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225)
        cy.wrap(el[0]).should('have.text' ,'5')
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'0');
      }
    })

    cy.tick(1000);
    cy.get('[data-cy="circle-container"] [data-cy="head"] [data-cy="circle"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'5');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'0');
      }
      if(i===2){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'34');
      }
    })

    cy.tick(1000);
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_127_224_81);
          cy.wrap(el[0]).should('have.text' ,'5');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
    cy.tick(2000);
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'5');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 4:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
  });

  it('delete from head', () => {
    cy.clock();
    cy.get('[data-cy="deleteFromHead"]').click();

    
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'0');
      }
      if(i===1){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
        cy.wrap(el[0]).should('have.text' ,'34');
      }
    })

    cy.tick(1000)

    cy.get('[data-cy="circle-container"] [data-cy="tail"] [data-cy="circle"]').each((el,i)=>{
      if(i===1){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'0');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      if(i===0){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225)
        cy.wrap(el[0]).should('have.text' ,'');
      }
      if(i===2){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
        cy.wrap(el[0]).should('have.text' ,'34');
      }
    })
    cy.tick(1000);
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
  }); 

  it('delete from tail', () => {
    cy.clock();
    cy.get('[data-cy="deleteFromTail"]').click();

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })

    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })

    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="tail"] [data-cy="circle"]').each((el,i)=>{
      if(i===3){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'1');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'');
          break;
      }
    })

    cy.tick(1000);
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').should('have.length', '3')
  }); 

  it('delete by index', () => {
    cy.clock();
    cy.get('[data-cy="inputIndex"]').type('1').should('have.value', '1');
    cy.get('[data-cy="deleteByIndex"]').click();
    
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'34');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
    cy.tick(1000);

    cy.get('[data-cy="circle-container"] [data-cy="tail"] [data-cy="circle"]').each((el,i)=>{
      if(i===2){
        cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
        cy.wrap(el[0]).should('have.text' ,'34');
      }
    })
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_210_82_225);
          cy.wrap(el[0]).should('have.text' ,'');
          break;
        case 3:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 4:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
    cy.tick(1000);
    cy.get('[data-cy="circle-container"] [data-cy="circle"]').each((el,i)=>{
      switch (i) {
        case 0:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'0');
          break;
        case 1:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'8');
          break;
        case 2:
          cy.wrap(el[0]).should(HAVE_CSS, BORDER_COLOR, RGB_0_50_255);
          cy.wrap(el[0]).should('have.text' ,'1');
          break;
      }
    })
  });
})

export default 0