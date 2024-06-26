import React, { useEffect, useState } from 'react';
import './ToyDetalPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../../services/httpClient';
import { ProductDetalType } from '../../types/ProductDetalsType';
import Heart from '../../assets/icons/heart.svg';
import RedHeart from '../../assets/icons/heartfilled.svg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { actions } from '../../app/Slices/cartSlice';
import { Loader } from '../../components/Loader/Loader';
import { 
  addToWishlist, 
  removeFromWishlist, 
  updateWishlist 
} from "../../app/Slices/wishListSlice";
import ButtonBack from '../../components/ButtonBack/ButtonBack';

export const ToyDetalPage = () => {
  const [info, setInfo] = useState<ProductDetalType | null> (null);
  const [buttonActive, setButtonActive] = useState<boolean>();
  const [loader, setLoader] = useState(true);
  const { cart } = useAppSelector(state => state.cart);
  const {wishs} = useAppSelector(state => state.wishlist);
  const { slug } = useParams();
  const { product } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const ids = wishs.map(el => el.product);
  const selectproduct = product.find(el => el.slug === slug);

  useEffect(() => {
    if (slug && product.length && selectproduct) {
      const selectId = selectproduct.id;
    
      client.get<ProductDetalType>(`shop/products/${selectId}`)
        .then(response => {
          setInfo(response);
        })
        .catch(error => console.log(error))
        .finally(() => setLoader(false));
    }
  }, [slug, product, selectproduct]);

  useEffect(() => {
    if (info) {
      if (ids.includes(info.id)) {
        setButtonActive(true);
      } else {
        setButtonActive(false);
      }
    }
  }, [ids, wishs, info]);

  const handleAddToWishlist = async (productId: number) => {
    try {
      await dispatch(addToWishlist(productId));
      dispatch(updateWishlist());
    } catch (error) {
      console.error('Помилка додавання до вішліста:', error);
    }
  };

  const handleRemoveToWishlist = async (productId: number) => {
    try {
      await dispatch(removeFromWishlist(productId));
      dispatch(updateWishlist());
    } catch (error) {
      console.error('Помилка додавання до вішліста:', error);
    }
  };

  const handleFav = (id: number) => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      if (ids.includes(id)) {
        handleRemoveToWishlist(id);
      } else {
        handleAddToWishlist(id);
      }
  
      setTimeout(() => {
        dispatch(updateWishlist());
      }, 100);
    }
  };

  const handleCartButton = () => {
    if (!isLoggedIn) {
      navigate('/login')
    } else if (info) {
      cart.includes(info.id)
        ? dispatch(actions.take(info.id))
        : dispatch(actions.add(info.id));
    }
  }
  
  return (
    <>
      {loader && (
        <Loader />
      )}

      {info && (
        <div className='info container'>
          <ButtonBack text={info.title} />

          <div className="info__container">
            <div className="info__imgs grid__item--desktop-1-5">
              <img className="info__img" src={info.images[0].image} alt={info.title} />
              <div className="info__imgs-container">
                <img className="info__img-duo" src={info.images[1].image} alt={info.title} />
                <img className="info__img-duo" src={info.images[2].image} alt={info.title} />
              </div>
            </div>

            <div className="info__right grid__item--desktop-6-8">
              <div className="info__right-container">
                <p className="info__right-title">Про {info.category.title}</p>
                <p className="info__right-description">{info.description}</p>
                <div className="info__right-count">
                  <p className="info__right-title">Ціна:</p>
                  <p className="info__right-title">{info.price}₴</p>
                </div>
              </div>
              <div className="info__right-buttons">
                <button className="info__right-cart" onClick={()=> handleCartButton()}>
                  {info.id && cart.includes(info.id)
                    ? <p className="info__right-fav-text">Додано в кошик</p>
                    : <p className="info__right-fav-text">Додати в кошик</p>
                  }
                </button>

                <button className="info__right-fav" onClick={() => handleFav(info.id)}>
                  {buttonActive
                    ? <p className="info__right-fav-text">Додано в обране</p>
                    : <p className="info__right-fav-text">Додати в обране</p>
                  }
                  {buttonActive
                    ? <img className="info__right-fav-button" src={RedHeart} alt="favourite" />
                    : <img className="info__right-fav-button" src={Heart} alt="favourite" />
                  }
                </button>
              </div>
            </div>
          </div>

          <div className="info__bottom">
            <p className="info__title-list">Зріст негідника:</p>
            <ul className="info__list">
              <li className="info__list-text">{info.size} сантиметрів</li>
            </ul>
            <p className="info__title-list">Матеріали:</p>
            <ul className="info__list">
              {info.materials.map(item => (
                <li className="info__list-text" key={item.name}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
