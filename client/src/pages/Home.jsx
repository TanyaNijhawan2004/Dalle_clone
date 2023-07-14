import React, { useState, useEffect } from 'react';
import { Card, Form, Loader } from '../Components';

//functional component
//update test2
//update test2
function RenderCards(props) {
  const { data, title } = props;

  if (data && data.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://localhost:3000/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPosts(result.data.reverse());
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (err) {
      console.error(err);
      // Handle the error, such as displaying an error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    clearTimeout(searchTimeout);
    const searchTimeout = setTimeout(() => {
      const searchResult = posts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedResults(searchResult);
    }, 500);

    setSearchTimeout(searchTimeout);
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extra-bold text-[#222328] text-[32px]">
            The Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[800px]">
            Browse through a collection of imaginative and visually stunning
            images generated by DALL-E AI
          </p>
        </div>
        <div className="mt-16">
          <Form
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing Results for{' '}
                  <span className="text-[#222328]">{searchText}</span>:
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found"
                  />
                ) : (
                  <RenderCards data={posts} title="No posts yet" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
