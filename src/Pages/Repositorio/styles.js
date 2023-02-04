import styled from "styled-components";

export const Loading = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: #fff;

    a{
        border: 0;
        outline: 0;
        background: transparent;
        
    }
`;


export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`;


export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0d2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const PagesActions = styled.div`
    display:flex;
    
    align-items:center;
    justify-content: space-between;
    

    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
            margin-top: 12px
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0D2636
        }

        div{
            flex: 1;
            margin-left:12px;

            p{
                margin-top: 10px;
                font-size: 15px;
                color: #000;
            }
        }

        strong{
            font-size: 15px;

            a{
                text-decoration: none;
                color: #222;
                transition: 0.3s;

                &:hover{
                  color: #0071db;

                }
            }

            span {
                background: #222;
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 4px 7px;
                margin-left: 10px
            }
        }
    }
`;


export const Filter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 35px;
  
  span{
    font-weight: bold;
    font-size: 17px;
    margin-right: 15px;
    color: #0D2636;
  }

  select{
    width: 120px;
    border: none;
    border-radius: 4px;
    font-size: 17px;
    background-color: #0D2636;
    color: #fff;
    padding: 5px;
  }
`;