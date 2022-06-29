import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import { getDoneRecipes } from '../../services/doneRecipes';

const copy = require('clipboard-copy');

function ScreenDoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  const doneRecipes = getDoneRecipes()
    .filter((recipe) => (filter === 'all' || recipe.type === filter));

  const copiedOnScreenTimer = () => {
    const TEXT_TIMER = 5000;
    setCopied(true);
    const textTimeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(textTimeout);
    }, TEXT_TIMER);
  };

  const copyToClipboard = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    copiedOnScreenTimer();
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                className="recipe-img"
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              onClick={ () => copyToClipboard(`${recipe.type}s`, recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareicon"
              />
            </button>
            {copied && <h1>Link copied!</h1>}
            {recipe.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScreenDoneRecipes;
