import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {
    const [search, setSearch] = useState("Pakistan");
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;


    const getData = async (query = search) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
            );
            const jsonData = await response.json();

            if (jsonData.articles && Array.isArray(jsonData.articles)) {
                let dt = jsonData.articles
                    .filter(article => article.urlToImage) 
                    .slice(0, 10);
                setNewsData(dt);
            } else {
                setNewsData([]);
            }
        } catch (err) {
            setError("Failed to fetch news. Please try again.");
            setNewsData([]);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        getData();
    }, [search]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value); 
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Geo News</h1>
                </div>
                <div className='searchBar'>
                    <input
                        type='text'
                        placeholder='Search News'
                        value={search}
                        onChange={handleInput}
                    />
                    <button onClick={() => getData(search)}>Search</button>
                </div>
            </nav>

            <div>
                <p className='head'>Stay Updated with Geo News</p>
            </div>

            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            <div>
                {loading && <p>Loading news...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && newsData.length === 0 && (
                    <p>No results found.</p>
                )}
                {!loading && !error && newsData.length > 0 && (
                    <Card data={newsData} />
                )}
            </div>
        </div>
    );
};

export default Newsapp;
