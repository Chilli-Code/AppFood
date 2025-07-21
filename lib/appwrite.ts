import { CreateUserParams, GetMenuParams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.chilly.foodapp",
    databaseId: "6872b2e50017bc9ea520",
    bucketId: "6875c328002b8d93b571",
    userCollectionId: "6872b307000c15867fc0",
    categoriesCollectionId: "6875be4600071ed59a05",
    menuCollectionId: "6875bf03002eddab92b2",
    customizationsCollectionId: "6875c08c0003daba4a54",
    menuCustomizationsCollectionId: "6875c1d300308c344a50",
    ordersCollectionId:'687d6959001f4fa2417c',

}


export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client); 


export const createUser = async ({ email, password, name, role }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name || "User");

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        accountId: newAccount.$id,
        avatar: avatarUrl,
        role, // ✅ aquí lo guardas
      }
    );
  } catch (e) {
    throw new Error(e as string);
  }
};


export const signIn = async ({email, password}: SignInParams) =>{
    try{
        const session = await account.createEmailPasswordSession(email, password);
    }catch (e){
        throw new Error(e as string);
    }
};


export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) return null;

    return currentUser.documents[0] as unknown as User; // 👈 casteo explícito
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getMenu = async({ category, query }: GetMenuParams) => {
    try{
        const queries: string [] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query)); 

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )
        return menus.documents;

    }catch(e){
        throw new Error (e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}


export const getMenuItemById = async (id: string) => {
  try {
    const item = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      id
    );
    return item;
  } catch (e) {
    throw new Error(e as string);
  }
};


export async function updateProfile(data: {
  name?: string;
  phone?: string;
  gender?: string;
  addresses?: Array<{ type: string; address: string; lat: number; lng: number }>;
}) {
  const currentAcc = await account.get();
  const accId = currentAcc.$id;

  if (data.name) await account.updateName(data.name);


  const docs = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", accId)]
  );

  if (docs.total === 0) {
    throw new Error("Documento de usuario no encontrado");
  }

  const userDoc = docs.documents[0];

  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.phone) updateData.phone = data.phone;
  if (data.gender) updateData.gender = data.gender;
  if (data.addresses) updateData.addresses = JSON.stringify(data.addresses);

  const updatedDoc = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userDoc.$id,
    updateData
  );

  return updatedDoc;
}

// Crear un nuevo pedido
export const createOrder = async (orderData: {
  userId: string;
  repartidorId?: string | null;
  status: string;
  totalPrice: number;
  deliveryAddress: string;
  items: string; // JSON string
}) => {
  try {
    const newOrder = await databases.createDocument(
      appwriteConfig.databaseId,
     appwriteConfig.ordersCollectionId, // reemplaza con tu collectionId de pedidos
      ID.unique(),
      orderData
    );
    return newOrder;
  } catch (e) {
    throw new Error(e as string);
  }
};

// Obtener pedidos por usuario
export const getOrdersByUser = async (userId: string) => {
  try {
    const orders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      [Query.equal("userId", userId)]
    );
    return orders.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

// Obtener pedidos asignados a repartidor
export const getOrdersByRepartidor = async (repartidorId: string) => {
  try {
    const orders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      [Query.equal("repartidorId", repartidorId)]
    );
    return orders.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

// Actualizar estado del pedido
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const updatedOrder = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      orderId,
      { status }
    );
    return updatedOrder;
  } catch (e) {
    throw new Error(e as string);
  }
};
export const getActiveOrderByUser = async (userId: string) => {
  

  try {
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      [
        Query.equal("userId", userId),
        Query.notEqual("status", "completed")
      ]
    );

    return res.documents[0] || null;
  } catch (error) {
    
    throw new Error("No se pudo obtener el pedido activo.");
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      orderId
    );
  } catch (e) {
    throw new Error(e as string);
  }
};


export const getOrderById = async (orderId: string) => {
  try {
    const order = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      orderId
    );
    return order;
  } catch (e) {
    throw new Error(e as string);
  }
};

// Borrar pedido por ID
export const deleteOrderById = async (orderId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      orderId
    );
  } catch (e) {
    throw new Error(e as string);
  }
};

