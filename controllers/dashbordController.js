const dashboardView = (req, res) => {
    res.render("dashboard", { 
        name : req.user.name
    });
}

module.exports = dashboardView;
