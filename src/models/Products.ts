import supabase from "../config/supabase.js";

// Interface exata com as colunas reais da tabela products no Supabase
export interface ProductData {
    category_id?: string;
    title: string;
    description: string;
    price: number;
    icon: string;       // Nome correto no banco
    available: boolean;  // Nome correto no banco
    active: boolean;
}

async function findAll() {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) throw error;
    return data;
}

async function findById(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

async function create(product: ProductData) {
    const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

    if (error) throw error;
    return data;
}

async function update(id: string, product: Partial<ProductData>) {
    const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

async function remove(id: string) {
    const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

async function searchByKeyword(keyword: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);

    if (error) throw error;
    return data;
}

export default {
    findAll,
    findById,
    create,
    update,
    remove,
    searchByKeyword
};