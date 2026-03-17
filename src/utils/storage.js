export const loadTrees = () => {
    const saved = localStorage.getItem('ivp_trees');
    return saved ? JSON.parse(saved) : [];
};

export const saveTrees = (trees) => {
    localStorage.setItem('ivp_trees', JSON.stringify(trees));
};