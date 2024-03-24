import React from 'react'
// import { useEffect,useState } from 'react';
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/ratings';
import { useGetProductDetailsQuery, useGetReviewQuery } from '../Slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addtoCart } from '../Slices/cartSlice';
import {LinkContainer} from "react-router-bootstrap"
import GetReview from './GetReview';
import Meta from './Meta';


const Productscreen = () => {
    // const [product,setproduct]= useState({})
    const {id:productId} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty,setqty] = useState(1)
    const {data,isLoading,error} = useGetProductDetailsQuery(productId);
    const {data:datas,isLoading:reviewloading,refetch} = useGetReviewQuery(productId);

    const maindata = {...datas}
   // console.log(maindata)
   const {product:dete} = maindata
   console.log(dete);
   
    // console.log(useGetProductDetailsQuery(productId));

    const mydat ={...data}
    // console.log(mydat);
    const {data:mydata} = mydat;
    // console.log(currentdata);
    // console.log(dataa)
    //  console.log(mydata);
    const products = {...mydata}
    // console.log(products);
    const {product}= products
    console.log(product);

    const addtoCartHandler = ()=>{
        dispatch(addtoCart({...product,qty}))
        navigate("/cart")

    }

    


    // useEffect(()=>{
    //     const fetchproduct = async()=>{
    //         const {data} =  await axios.get(`/api/products/${productId}`)
    //         // console.log(data.data);
    //         setproduct(data.data.product);
        
            
    //     }
    //     fetchproduct();


    // },[productId,product,setproduct])
  return (
    <>
      <Row style={{marginTop:"20px"}}>
    {isLoading || reviewloading?(<Loader></Loader>):error?(<Message variant="danger">{error?.data?.message || error.error}</Message>):(<>
    <Meta title={product.name}></Meta>
    <Col md={5}>
      <Image src={product.image} alt={product.name} fluid></Image>
    </Col>
    <Col md={4}>
      <ListGroup variant='flush'>
          <ListGroupItem>
              <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
              <Rating value={dete.averageRating} text={dete.numRating} key={product._id}></Rating>
          </ListGroupItem>
          <ListGroupItem>
              Description : {product.description}
          </ListGroupItem>

      </ListGroup>
    </Col>
    <Col md={3}>
      <Card>
          <ListGroup variant='flush'>
              <ListGroupItem>
                  <Row>
                      <Col>Price:
                      </Col>
                      <Col>
                      <strong>${product.price}</strong>
                      </Col>
                  </Row>
              </ListGroupItem>
              <ListGroupItem>
                  <Row>
                      <Col>Stock:
                      </Col>
                      <Col>
                      <strong>{product.countInstock>0?'In Stock':'Out of Stock'}</strong>
                      </Col>
                  </Row>
              </ListGroupItem>
             {product.countInstock>0&& (
                <ListGroupItem>
                    <Row>
                        <Col>
                        Quantity
                        </Col>
                        <Col>
                        <Form.Control as="select" value={qty} onChange={(e)=>Number(setqty(e.target.value))}>
                         {[...Array(product.countInstock).keys()].map((x)=>
                         <option key={x+1} value={x+1}>
                          {x+1}
                         </option>)}
                        </Form.Control>
                        </Col>
                    </Row>
                </ListGroupItem>
             )}
             {product.countInstock>0&&(<ListGroupItem>
                  <Button className='btn-block' type='button' onClick={addtoCartHandler}>Add to Cart</Button>
              </ListGroupItem>)}
          </ListGroup>
      </Card>
      <Card className='mt-3'>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <LinkContainer to={`/products/${product._id}/review`}>
                   <Button className="d-grid gap-2" variant='info'><strong>Write a Review</strong></Button>
                </LinkContainer>
            </ListGroup.Item>
            <ListGroup.Item>
                <LinkContainer to={`/products/${product._id}/review/view`}>
                   <Button className="d-grid gap-2" variant='info'><strong>See all Reviews</strong></Button>
                </LinkContainer>
            </ListGroup.Item>
        </ListGroup>
         
      </Card>
    </Col>
    </>
    )}
    


    </Row>
    <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
    </>
  )
}

export default Productscreen