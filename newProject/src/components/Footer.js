
function Footer(props) {
    // console.log(props)


    return (
                <div className="row fixed-bottom">
                    {/* <button type="button" className="btn btn-danger col-2">Reset</button> */}
                    <div className="col-8 bg-body-secondary text-center">
                       Cart total : Rs.{props.totalAmt}/-
                    </div>
                    <a href="/Summary" className="btn btn-primary col-2" >Proceed to pay</a>
                    
                </div>
            )
}

export default Footer;