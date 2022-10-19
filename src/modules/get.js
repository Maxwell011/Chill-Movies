const getApi = async () => {
    const fetchResult = await fetch('https://api.tvmaze.com/shows');
    const ShowResult = await fetchResult.json();
    return ShowResult.slice(0, 40);
};
getApi();

export default getApi;