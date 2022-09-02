const product = { contractOption:[{label:"1 year",value:1, discount:0},{label:"2 year - 5% less",value:2, discount:5},{label:"3 year - 10% less",value:3, discount:10},{label:"4 year - 15% less",value:4, discount:15}]};

const TestPage = () => {

  const contractOption = product ? product.contractOption : [];
  let defItem = contractOption.length && contractOption[0];
  let defPrice = 500; 
  
  const [contract, setContract] = useState(defItem);
  const [price, setPrice] = useState(defPrice)
  
 
const handleContract = (e) =>{
  let item = contractOption.find((item)=>item.value.toString() === e.target.value);
  
  if(item){    
      let discountPrice = defPrice - (defPrice * (item.discount/100))
      setContract(item)
      setPrice(discountPrice)
    } 
}

  const onFormSubmit = (formValue) => {   
    console.log(contract, price)    
  };


  return (
    <React.Fragment>
      
      <Content>
        <BlockHead>
          
        </BlockHead>
        <Block>
          <Card className="card-bordered">
            <CardBody>
              
                  <div className="form-control-wrap">
                    {contractOption.map((con,idx )=>{
                      if(idx === 0)
                      return <input key={con.value} value={con.value} defaultChecked
                      type="radio"  name="contract"  onChange={handleContract}/>
                      else
                      return <input key={con.value} value={con.value} 
                      type="radio"  name="contract"  onChange={handleContract}/>
                      
                    })}
                  
                  </div>
                  Price : {price}
                  
             
              {JSON.stringify(contract)}
            </CardBody>
          </Card>
        </Block>
      
      </Content>
    </React.Fragment>
  );
};