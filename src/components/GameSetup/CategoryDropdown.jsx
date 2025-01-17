
/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * CategoryDropdown.jsx
 * This component displays a dropdown to select category for quiz questions.
 */

const CategoryDropdown = (props) => {
    
    const loadCategories = () => {
        return props.categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
        ));
    }

    return (
        <div className="mb-3">
        <label className="fw-bold d-block">Category</label>
        <select
            className="form-select"
            onChange={(e) => props.setCategory(e.target.value)}
        >
            {loadCategories()}
        </select>
        </div>
    )
};

export default CategoryDropdown;