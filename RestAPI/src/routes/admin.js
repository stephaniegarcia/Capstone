const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
const organizations = require('../organizations.json');


router.post('/admin/login', (req,res) => {

    const {email, password} = req.body;

    if(email && password){
        if(validEmail(email)){
            res.status(200).send(`Email: ${email} Password: ${password}`);
        }
        else{
            res.status(404).send("Error");
        }
    }
    else{
        res.status(404).send("Error");
    }

});

router.get('/admin/organizations', (req, res) => {
    
    if (organizations){
        res.status(200).json(organizations);
    }
    else{
        res.status(400).send("Organizations not found");
    }
    
});

router.get('/admin/organization/stars/:Id', (req, res) => {

    let founded = false;
    let average_stars;
  
    _.each(organizations, (organization, i) => {
        console.log(organization.id);
        if(organization.id == req.params.Id){
            founded = true;
            average_stars = organization.average_stars;
        }
    });

    if(founded){
        res.status(200).send(average_stars);
    }
    else{
        res.status(404).send("Organization not found");
    }
});

router.get("/admin/organizations/topPerType", (req, res) => {
    org = [
      {
        type: "microempresas",
        name: [
          "JunX",
          "SSS",
          "MMM",
          "Logitech",
          "Infox",
          "JacksonX",
          "Los gapos",
          "Places787",
          "Tempis",
          "OneX",
        ],
      },
      {
        type: "comercial",
        name: [
          "Bravos Cidra",
          "Mulos",
          "Pentatonix",
          "Bulldogs",
          "Infox",
          "JacksonX",
          "Los gapos",
          "Places787",
          "Tempis",
          "OneX",
        ],
      },
      {
        type: "Empresa basada en inovacion",
        name: [
          "Cayeyanos",
          "Lolas",
          "Chiviri",
          "5 de Maya",
          "Cabra tosta",
          "Centenaria",
          "Bamba",
          "EXP",
          "TEMPO",
          "Chronome",
        ],
      },
      {
        type: "Empresa en crecimiento",
        name: [
          "Spooky",
          "Skreetch",
          "Rick",
          "E=MC",
          "SNEEK",
          "JJ COOling style",
          "Zombie",
          "Wind",
          "Tempis",
          "U",
        ],
      },
    ];
  
    if (org) {
      res.status(200).json(org);
    } else {
      res.status(404).send("Organizations not found");
    }
  });
  
  
  router.get("/admin/organizations/poorperforming", (req, res) => {
    org = [
      {
        name: [
          "JunX",
          "SSS",
          "MMM",
          "Logitech",
          "Infox",
          "JacksonX",
          "Los gapos",
          "Places787",
          "Tempis",
          "OneX",
          "Bravos Cidra",
          "Mulos",
          "Pentatonix",
          "Bulldogs",
        ],
      },
    ];
  
    if (org) {
      res.status(200).json(org);
    } else {
      res.status(404).send("Organizations not found");
    }
  });

router.get('/admin/organizations/topPerStage', (req, res) => {
    data = [
        {
            stage : "Idea/Concepto",
            names : [
                "JunX",
                "SSS",
                "MMM",
                "Logitech",
                "Infox",
                "JacksonX",
                "Los gapos",
                "Places787",
                "Tempis",
                "OneX"
            ]
        
        },
        {
            stage : "Prueba de Concepto",
            names : [
                "Bravos Cidra",
                "Mulos",
                "Pentatonix",
                "Bulldogs",
                "Infox",
                "JacksonX",
                "Los gapos",
                "Places787",
                "Tempis",
                "OneX"
            ]
        
        },
        {
            stage : "Prototipo",
            names : [
                "Cayeyanos",
                "Lolas",
                "Chiviri",
                "5 de Maya",
                "Cabra tosta",
                "Centenaria",
                "Bamba",
                "EXP",
                "TEMPO",
                "Chronome"
            ]
        
        },
        {
            stage : "Lanzamiento",
            names : [
                "Spooky",
                "Skreetch",
                "Rick",
                "E=MC",
                "SNEEK",
                "JJ COOling style",
                "Zombie",
                "Wind",
                "Tempis",
                "U"
            ]
        
        },
        {
            stage : "Crecimiento",
            names : [
                "Spooky",
                "Skreetch",
                "Rick",
                "E=MC",
                "SNEEK",
                "JJ COOling style",
                "Zombie",
                "Wind",
                "Tempis",
                "U"
            ]
        
        },
        {
            stage : "Expansión",
            names : [
                "JunX",
                "SSS",
                "MMM",
                "Logitech",
                "Infox",
                "JacksonX",
                "Los gapos",
                "Places787",
                "Tempis",
                "OneX"
            ]
        }
    ]

    if(data) {
        res.status(200).json(data);
    }
    else{
        res.status(400).send("Error");
    }

    
});

router.get("/admin/organizations/mostContacted", (req, res) => {
    org = [
      {
        name: "Los gapos",
        total: 30  
      },
      {
        name: "Tempis",
        total: 25
      },
      {
        name: "Places787",
        total: 22
      }

    ];

  
  
    if (org) {
      res.status(200).json(org);
    } else {
      res.status(404).send("Organizations not found");
    }
});

router.get("/admin/accountsPerWeek", (req, res) => {
    log = [
      {
        week: "week 1",
        count: "2",
      },
      {
        week: "week 2",
        count: "5",
      },
      {
        week: "week 3",
        count: "10",
      },
      {
        week: "week 4",
        count: "0",
      },
    ];
  
    if (log) {
      res.status(200).json(log);
    } else {
      res.status(404).send("Counts per week not found");
    }
});

router.post('/admin/organization', (req, res) => {

    const {organizations_name, email, phone, stage, type, link} = req.body;

    console.log(type);
    if(organizations_name && email && phone && stage && type && link){
        if(validEmail(email) && validPhone(phone)){
            res.status(200).json(req.body);
        }
    }
    else{
        res.status(404).send("Error")
    }

});

router.put('/admin/organization/:id', (req, res) => {

    const {organizations_name, email, phone, stage, type, link} = req.body;
    let founded = false;
    console.log(1);

    if (organizations_name && email && phone && stage && type && link){
        if(validEmail(email) && validPhone(phone)){
            console.log(1);
            organizations.forEach((organization) =>{
                if(organization.id == req.params.id){
                    founded = true;
                    console.log(1);
                    organization.organizations_name = organizations_name;
                    organization.email = email;
                    organization.phone = phone;
                    organization.stage = stage;
                    organization.type = type;
                    organization.link = link;
                    organization.average_stars = organization.average_stars;
                    console.log(founded);
                    res.status(200).json(organizations);
                }
            });
            
        }
        else{
            res.status(400).send("Error");
        }
    }
    else{
        res.status(400).send("Error");
    }

    if(!founded){
        res.status(404).send("Organization not found");
    }

});

router.delete("/admin/organization/:orgId", (req, res) => {
    let isDeleted = false;
    console.log(1);
    let i = 0;
    organizations.forEach((organization) => {
      console.log(organization);
      if (organization.id == req.params.orgId) {
        organizations.splice(i, 1);
        isDeleted = true;
      }
      i++;
    });
  
    if (isDeleted) {
      res.status(200).json(organizations);
    } else {
      res.status(404).send("Organization not found.");
    }
  });

  function validEmail(email) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(email).search (filter) != -1;
}

function validPhone(phone) {
    var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return String(phone).search (filter) != -1;
}

module.exports = router;