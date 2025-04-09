import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/'); // зашли на сайт 
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // нашлки кнопку "Восстановить пароль", проверили цвет
          });
    afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible'); // ннашли кнопку крестика и она видна пользователю
           });
     it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login ); // нашли кнопку, ввели значение в инпут
         cy.get(main_page.password).type(data.password); // нашли пароль, ввели пароль
         cy.get(main_page.login_button ).click(); // нажать войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю что текст совпадает
         cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю

     })
     it('Проверка восстановения пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нашли кнопку, нажали войти
        cy.get(recovery_password.title).contains('Восстановите пароль'); // текст окна совпадает
        cy.get(recovery_password.title).should('be.visible'); // текст виден пользователю
        cy.get(recovery_password.close).should('be.visible'); // крестик виден пользователю
        cy.get(recovery_password.email).type('alyona.sss63@icloud.com'); // нашли импут, ввели почту
        cy.get(recovery_password.send_button).contains('Отправить код');
        cy.get(recovery_password.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.title).should('be.visible')

    })
    it('Негативный кейс, неправильный пароль', function () {
        cy.get(main_page.email).type(data.login); // нашли кнопку, ввели значение в инпут
        cy.get(main_page.password).type('iLoveqastudio13'); // нашли пароль, ввели пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что текст совпадает
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю

    })
    it('Негативный кейс, неправильный логин', function () {
        cy.get(main_page.email).type('germaaaan@dolnikov.ru'); // нашли кнопку, ввели значение в инпут
        cy.get(main_page.password).type(data.password); // нашли пароль, ввели пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что текст совпадает
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю

    })
    it('Негативный кейс, логин без @', function () {
        cy.get(main_page.email).type('germaandolnikov.ru'); // нашли кнопку, ввели значение в инпут
        cy.get(main_page.password).type(data.password); // нашли пароль, ввели пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю что текст совпадает
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю

    })
    it('Проверка регистра в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // нашли кнопку, ввели значение в инпут
        cy.get(main_page.password).type(data.password); // нашли пароль, ввели пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что текст совпадает
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю

    })
 
 })
 