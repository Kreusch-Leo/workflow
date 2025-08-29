const buttonNewProject = document.getElementById("new-project-button") as HTMLButtonElement;
const buttonSelectProject = document.getElementById("select-project-button") as HTMLButtonElement;
const buttonListProjects = document.getElementById("list-projects-button") as HTMLButtonElement;
const buttonQuitApp = document.getElementById("quit-app-button") as HTMLButtonElement;

const projectListage = document.getElementById("project-list") as HTMLSelectElement

function newProject() {
    window.electronAPI.openWindow(window.electronAPI.WINDOWS.NEW_PROJECT)
}

function openProject() {
    window.electronAPI.openWindow(window.electronAPI.WINDOWS.SELECT_PROJECT)
}

function listProjects() {
    const dirsNames = window.electronAPI.listDirs(window.electronAPI.PROJECT_PATH)
    
    let list = ""
    
    for(let dir of dirsNames) {
        list += `<option>${dir}<\option>`
    }

    projectListage.innerHTML = list

}

function quitApp() {
    window.electronAPI.quitApp()
}

buttonNewProject.addEventListener("click", newProject)
buttonSelectProject.addEventListener("click", openProject)
buttonListProjects.addEventListener("click", listProjects)
buttonQuitApp.addEventListener("click", quitApp)
