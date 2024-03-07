import { ProtoBrowser } from '../ProtoBrowser'

const DEBUG = process.env.TEST_DEBUG === 'true';

const { execSync } = require('child_process');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
// Page menu opts
const PAGE_TEMPLATES = {
    BLANK: "blank",
    DEFAULT: "default",
    ADMIN: "admin",
    LANDING: "landing",
    ECOMERCE: "ecomerce",
    NEWSFEED: "newsfeed",
}
// Api menu opt
const API_TEMPLATES = {
    Automatic_CRUD: 0,
    Automatic_CRUD_Custom_Storage: 1,
    IOT_Router: 2,
    Empty: 3
}
// Api menu opt
const API_OBJECT_OPTIONS = {
    Without_Object: 0
}
const USER_IDENTIFIER = 'user@user.user'
const USER_PASSWORD = 'user1234'

describe("Basic tests", () => {
    let protoBrowser: ProtoBrowser;
    beforeEach(async () => {
        protoBrowser = await ProtoBrowser.__newInstance__(!DEBUG)
    }, 15000)
    afterEach(async () => {
        await protoBrowser?.close()
    })
    it("should have a documentation page", async () => {
        await protoBrowser.navigateToDocumentation()
        expect(await protoBrowser.waitForElement('#__next')).toBeTruthy();
    }, 30000)
    it("should have a public sign in authentication interface", async () => {
        await protoBrowser.navigateToLogin()
        expect(await protoBrowser.getUrlPath()).toBe('/auth/login');
        expect(await protoBrowser.waitForElement('#sign-in-email-input')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-in-password-input')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-in-btn')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-up-link')).toBeTruthy();
    }, 30000)
    it("should have a public sign up authentication interface", async () => {
        await protoBrowser.navigateToRegister()
        expect(await protoBrowser.getUrlPath()).toBe('/auth/register');
        expect(await protoBrowser.waitForElement('#sign-up-email-input')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-up-password-input')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-up-repassword-input')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-up-btn')).toBeTruthy();
        expect(await protoBrowser.waitForElement('#sign-in-link')).toBeTruthy();
    }, 30000)
    it("should be able to register and retrieve a session using sign up interface", async () => {
        await protoBrowser.navigateToRegister()
        await protoBrowser.waitForElement('#sign-up-email-input');
        await protoBrowser.signUpFlow(`randomuser-${uuidv4()}@noreply.com`, 'changeme4321');
        expect(await protoBrowser.getUrlPath()).toBe('/')
    }, 30000)
})
describe("Test admin capabilities", () => {
    let protoBrowser: ProtoBrowser;

    beforeAll(async () => { // Create a user with admin role
        try {
            const output = execSync(`cd ${path.join(__dirname, '..', '..', '..')} && yarn add-user ${USER_IDENTIFIER} ${USER_PASSWORD} admin`, { encoding: 'utf-8', stdio: 'inherit' })
            expect(output.includes('Done')).toBeTruthy();
        } catch (e) { } // Prevent crash when user already exist
        // Login and navigate to workspace
        protoBrowser = await ProtoBrowser.__newInstance__(!DEBUG)
        await protoBrowser.navigateToLogin();
        await protoBrowser.signInSubmit(USER_IDENTIFIER, USER_PASSWORD);
        await protoBrowser.waitForElement('#header-session-user-id');
    }, 60000)

    afterAll(async () => {
        await protoBrowser?.close()
    })

    describe("Test entities autocreation", () => {
        beforeAll(async () => {
            await protoBrowser.navigateToWorkspace();
        }, 60000)
        describe("test api creations", () => {
            it("should be able to create an empty api", async () => {
                const apiName = 'testapi'
                await protoBrowser.navigateToWorkspaceSection('apis')
                await protoBrowser.getEditableObjectCreate()
                expect(await protoBrowser.getElementText('#eo-dlg-title')).toBe('Add Api')
                await protoBrowser.fillEditableObjectInput('name', apiName)
                await protoBrowser.fillEditableObjectSelect('template', API_TEMPLATES.Empty)
                await protoBrowser.fillEditableObjectSelect('object', API_OBJECT_OPTIONS.Without_Object)
                await protoBrowser.submitEditableObject()
                await protoBrowser.waitForElement(`#apis-datatable-${apiName}`)
                expect(await protoBrowser.getElementText(`#apis-datatable-${apiName}`)).toBe(apiName);
            }, 60000)
        })

        describe("test object creation", () => {
            beforeEach(async () => {
                await protoBrowser.navigateToWorkspaceSection('objects')
                await protoBrowser.getEditableObjectCreate()
            }, 60000)

            it("should be able to create a simple object", async () => {
                expect(await protoBrowser.getElementText('#eo-dlg-title')).toBe('Add Object')
                const objectName = 'testObject'
                await protoBrowser.fillEditableObjectInput('name', objectName)
                // Open editable form
                await protoBrowser.clickElement("xpath=//*[@id='eo-formgroup']/span/div/div/span/button")
                await protoBrowser.clickElement("#eo-obj-comp-btn")
                // Fill object key
                const keyName = "myKey"
                await protoBrowser.waitForElement("xpath=//*[@id='eo-add-field-input']/span/input");
                await protoBrowser.getPage().fill("xpath=//*[@id='eo-add-field-input']/span/input", keyName);
                await protoBrowser.clickElement("#alert-dlg-accept")
                await protoBrowser.submitEditableObject()
                await protoBrowser.waitForElement(`#objects-datatable-${objectName}`)
                expect(await protoBrowser.getElementText(`#objects-datatable-${objectName}`)).toBe(objectName);
            }, 60000)
        })

        describe("test page entity", () => {
            const pageName = 'testpage'
            const pageRoute = 'testpage'
            describe("test page creation", () => {
                beforeEach(async () => {
                    await protoBrowser.navigateToWorkspaceSection('pages')
                    await protoBrowser.getEditableObjectCreate()
                }, 60000)
                it("should be able to create a blank page", async () => {
                    // Select template
                    await protoBrowser.clickElement(`#pages-template-${PAGE_TEMPLATES.BLANK}`)
                    await protoBrowser.clickElement(`#admin-pages-add-btn`)
                    // Configure page
                    await protoBrowser.fillEditableObjectInput('name', pageName)
                    await protoBrowser.fillEditableObjectInput('route', pageRoute)
                    expect(await protoBrowser.getElementText('#eo-dlg-title')).toBe('Add Page')
                    await protoBrowser.clickElement(`#admin-pages-add-btn`)
                    expect(await protoBrowser.getElementText(`#pages-datatable-${pageName}`)).toBe(pageName);
                }, 60000)
            })

            describe("test edit page", () => {
                beforeEach(async () => {
                    await protoBrowser.navigateToWorkspaceSection('pages')
                }, 60000)
                it("should be able to edit the page", async () => {
                    await protoBrowser.waitForElement('#admin-dataview-add-btn');
                    await protoBrowser.clickElement("#more-btn-home")
                    await protoBrowser.clickElement("#more-btn-home-option-1")
                    expect(await protoBrowser.waitForElement('#file-widget-home')).toBeTruthy();
                }, 60000)
            })

            describe("test delete page", () => {
                beforeEach(async () => {
                    await protoBrowser.navigateToWorkspaceSection('pages')
                }, 60000)
                it("should be able to delete the page", async () => {
                    await protoBrowser.waitForElement('#admin-dataview-add-btn');
                    await protoBrowser.clickElement(`#more-btn-${pageName}`)
                    await protoBrowser.clickElement(`#more-btn-${pageName}-delete`)
                    protoBrowser.waitForElement(`#pages-datatable-${pageName}`, 1000).then().catch(e => expect(e).toBeTruthy());
                }, 60000)
            })
        })
    })
    describe("Testing page in useEdit mode", () => {
        beforeAll(async () => {
            await protoBrowser.goTo('');
            await protoBrowser.clickElement("#use-edit-btn")
            await protoBrowser.waitForElement("#editor-frame-container")
        }, 60000)

        it("should be able to save edited page content", async () => {
            const vp = ProtoBrowser.getViewPortSize()
            await protoBrowser.mouseClick(Math.floor(vp.width / 2), Math.floor(vp.height / 2))
            await protoBrowser.clickElement("#render-node-delete-btn")
            await protoBrowser.clickElement("#save-nodes-btn")
            let error
            try {
                // If "#nextjs__container_build_error_label" exist, means that has error compiling
                await protoBrowser.waitForElement("#nextjs__container_build_error_label", 6000)
            } catch (e) {
                error = !!e
            }
            expect(error).toBeTruthy()
        }, 50000)

        it("should be able to drag and drop all components", async () => {
            const allDraggablesIds = await protoBrowser.getClassNameIds('.draggable-element')
            // TODO: Test all draggable elements instead of the first one (now avoid 7 extra minutes just for this test).
            const draggablesIds = [allDraggablesIds[0]]
            for (const elementId of draggablesIds) {
                await protoBrowser.clickElement("#components-to-drag-btn")
                await protoBrowser.evaluate(".glass", element => element.style.display = 'none')
                await protoBrowser.waitForElement(".glass", 6000, { state: "hidden" })
                await protoBrowser.waitForElement(".visualui-sidebar")
                await protoBrowser.dragAndDrop('#' + elementId, "#home-page")
                //TODO: change "#left-actions-container" id for components container id 
                // await protoBrowser.evaluate("#left-actions-container", element => element.style.display = 'flex')
            }
        }, 70000)
    })
})