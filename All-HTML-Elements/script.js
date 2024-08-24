export function runScript() {
        let availableElements = []
        const links = document.querySelectorAll("td>a");
        links.forEach(link => {
            const raw_link = link.getAttribute("href");
            const rls = raw_link.split("/");
            const last_link = rls[rls.length - 1];
            availableElements.push(last_link)
            link.setAttribute("target", "_blank");
            link.setAttribute("id",last_link)
            link.setAttribute(
                "href",
                `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${last_link}`
            );
        });
  
    const dropDowndivs = document.querySelectorAll("section>h2");
  
    dropDowndivs.forEach(div => {
      const dropDownBtn = document.createElement("button");
      dropDownBtn.textContent = ">";
      dropDownBtn.classList.add("drop-down");
      div.appendChild(dropDownBtn);
    });
  
    const dropDownBtns = document.querySelectorAll(".drop-down");
  
    dropDownBtns.forEach(btn => {
      const btnGrandParent = btn.parentElement.parentElement;
      const contentBox = btnGrandParent.querySelector(".section-content");
      contentBox.classList.toggle("hidden");
    });
  
    const defaultclass = ()=>{
      for (let i = 0; i < 4; i++) {
        // console.log(dropDownBtns[i]);
        dropDownBtns[i].classList.toggle("rotate");
        const section = dropDownBtns[i].parentElement.parentElement;
        const contentBox = section.querySelector(".section-content");
        contentBox.classList.toggle("hidden");
      }
    }
  
    defaultclass();
  
    dropDownBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const btnGrandParent = btn.parentElement.parentElement;
        const contentBox = btnGrandParent.querySelector(".section-content");
        contentBox.classList.toggle("hidden");
        btn.classList.toggle("rotate");
      });
    });

    // const searchFunc = ()=>{
    //     // const codeEl = document.querySelectorAll["code"]
    //     // console.log(codeEl) 
        
    //     const queryInput = document.querySelector('input')
    //     // const elDataset = document.querySelector('.searchDiv')
    //     const queryResultDiv = queryInput.parentElement.querySelector(".results")
    //     queryInput.addEventListener("keyup", ()=>{
    //         const usr_query = queryInput.value
    //         // console.log(usr_query);
    //         const filteredElementsNotSorted = availableElements.filter(element => element.includes(usr_query));
    //         const filteredElements = filteredElementsNotSorted .sort()
    //         const uo_list = queryInput.parentElement.querySelector("ul")
    //         uo_list.innerHTML = ""
    //         for (let i = 0; i < filteredElements.length; i++) {
    //             uo_list.innerHTML += `<li><a href="#${filteredElements[i]}">${filteredElements[i]}</a></li>`
    //             // console.log(li_el);
                
    //         }
    //         if(usr_query.length >= 1){
    //             queryInput.parentElement.classList.remove("bdr-btm-radius")
    //             queryResultDiv.classList.remove("hidden")
    //             dropDownBtns.forEach(btn => {
    //                 const btnGrandParent = btn.parentElement.parentElement;
    //                 const contentBox = btnGrandParent.querySelector(".section-content");
    //                 contentBox.classList.remove("hidden");
    //             });
    //         }
    //         if(usr_query.length < 1){
    //             queryResultDiv.classList.add("hidden")
    //             queryInput.parentElement.classList.add("bdr-btm-radius")
    //         }
    //         const result_link = document.querySelectorAll("ul li a")
    //         result_link.forEach(link =>{
    //             link.addEventListener("click", ()=>{
    //                 queryResultDiv.classList.add("hidden")
    //                 queryInput.parentElement.classList.add("bdr-btm-radius")
    //                 queryInput.value="";
    //             })
    //         })
    //         document.addEventListener('click', function(event) {
    //             const targetElement = event.target; // Clicked element
    //             console.log(targetElement);
    //             // Check if the clicked element is inside the div or its child elements
    //             if (!queryResultDiv.contains(targetElement) && !queryResultDiv.classList.contains("hidden")) {
    //                     queryResultDiv.classList.add("hidden") // Hide the div
    //                     queryResultDiv.parentElement.classList.add("bdr-btm-radius")
    //             }
    //         });
    //     })
    // } 
    const searchFunc = () => {
        const queryInput = document.querySelector('input');
        const queryResultDiv = queryInput.parentElement.querySelector('.results');
      
        queryInput.addEventListener('keyup', () => {
          const usr_query = queryInput.value;
          // const availableLinks = .forEach(e => e.toLowerCase());
          const availablelinks = [...new Set(availableElements)]
          const filteredElements = availablelinks.filter(element =>
            element.includes(usr_query)
          );
      
          // Custom sorting based on closest match
          filteredElements.sort((a, b) => {
            const aIndex = a.indexOf(usr_query);
            const bIndex = b.indexOf(usr_query);
            if (aIndex !== bIndex) {
              return aIndex - bIndex;
            }
            return a.localeCompare(b); // Sort alphabetically if indices are the same
          });
      
          const uo_list = queryInput.parentElement.querySelector('ul');
          uo_list.innerHTML = '';
      
          for (let i = 0; i < filteredElements.length; i++) {
            uo_list.innerHTML += `<li><a href="#${filteredElements[i]}">${filteredElements[i]}</a></li>`;
          }
          if(usr_query.length >= 1){
            queryInput.parentElement.classList.remove("bdr-btm-radius")
            queryResultDiv.classList.remove("hidden")
            dropDownBtns.forEach(btn => {
                const btnGrandParent = btn.parentElement.parentElement;
                const contentBox = btnGrandParent.querySelector(".section-content");
                contentBox.classList.remove("hidden");
            });
        }
        if(usr_query.length < 1){
            queryResultDiv.classList.add("hidden")
            queryInput.parentElement.classList.add("bdr-btm-radius")
        }
        const result_link = document.querySelectorAll("ul li")
        result_link.forEach(link =>{
            // link.addEventListener("click", ()=>{
            //     queryResultDiv.classList.add("hidden")
            //     queryInput.parentElement.classList.add("bdr-btm-radius")
            //     queryInput.value="";
            // })
            link.addEventListener("click", (e) => {
              // e.preventDefault();
              const targetSectionId = link.getAttribute("href").substring(1);
              const targetSection = document.getElementById(targetSectionId);
              targetSection.scrollIntoView({ behavior: "smooth" });

              queryResultDiv.classList.add("hidden");
              queryInput.parentElement.classList.add("bdr-btm-radius");
              queryInput.value = "";

        })
        document.addEventListener('click', function(event) {
            const targetElement = event.target; // Clicked element
            console.log(targetElement);
            // Check if the clicked element is inside the div or its child elements
            if (!queryResultDiv.contains(targetElement) && !queryResultDiv.classList.contains("hidden")) {
                    queryResultDiv.classList.add("hidden") // Hide the div
                    queryResultDiv.parentElement.classList.add("bdr-btm-radius")
                    queryInput.value = "";
            }
        });
        

    })
} 
    )}
    searchFunc()

}
