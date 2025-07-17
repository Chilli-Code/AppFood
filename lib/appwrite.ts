import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
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


export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name || "User");

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({email, password}: SignInParams) =>{
    try{
        const session = await account.createEmailPasswordSession(email, password);
    }catch (e){
        throw new Error(e as string);
    }
};


export const getCurrentUser = async () =>{
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];

    }catch(e){
        console.log(e);
        throw new Error(e as string);
    }
}


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
