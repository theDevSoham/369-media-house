import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cacheTags";

/**
 * GET /api/admin/pages/:id
 * Returns a single page (admin only)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page id" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    const page = await db
      .collection(process.env.PAGES_COLLECTION!)
      .findOne({ _id: new ObjectId(id) });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...page,
      _id: page._id.toString(),
    });
  } catch (err) {
    console.error("GET /api/admin/pages/:id failed", err);
    return NextResponse.json({ error: "Failed to load page" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/pages/:id
 * Updates an existing page (admin only)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  console.log("➡️ PUT /api/admin/pages/:id called");

  try {
    /* -------------------- Params -------------------- */
    let id: string;
    try {
      const resolvedParams = await params;
      id = resolvedParams.id;
      console.log("📌 Page ID:", id);
    } catch (err) {
      console.error("❌ Failed to resolve params", err);
      return NextResponse.json(
        { error: "Invalid route parameters" },
        { status: 400 },
      );
    }

    /* -------------------- ID validation -------------------- */
    if (!ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId:", id);
      return NextResponse.json({ error: "Invalid page id" }, { status: 400 });
    }

    /* -------------------- Body parsing -------------------- */
    let body: any;
    try {
      body = await req.json();
      console.log("📦 Request body received:", body);
    } catch (err) {
      console.error("❌ Failed to parse JSON body", err);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    /* -------------------- Required fields -------------------- */
    const { name, route, status, seo, component_data, slug } = body;

    if (!name || typeof name !== "string") {
      console.error("❌ Invalid name field:", name);
      return NextResponse.json(
        { error: "Page name is required" },
        { status: 400 },
      );
    }

    if (!route || typeof route !== "string") {
      console.error("❌ Invalid route field:", route);
      return NextResponse.json({ error: "Route is required" }, { status: 400 });
    }

    if (status && !["draft", "published"].includes(status)) {
      console.error("❌ Invalid status value:", status);
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    if (!Array.isArray(component_data)) {
      console.error("❌ component_data is not an array:", component_data);
      return NextResponse.json(
        { error: "component_data must be an array" },
        { status: 400 },
      );
    }

    if (seo && typeof seo !== "object") {
      console.error("❌ seo is not an object:", seo);
      return NextResponse.json(
        { error: "seo must be an object" },
        { status: 400 },
      );
    }

    console.log("✅ Basic validation passed");

    /* -------------------- DB -------------------- */
    let client;
    try {
      client = await clientPromise;
      console.log("✅ Mongo client connected");
    } catch (err) {
      console.error("❌ Failed to connect to MongoDB", err);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.PAGES_COLLECTION!);

    let existingPage;
    try {
      existingPage = await collection.findOne({
        _id: new ObjectId(id),
      });
      console.log("📄 Existing page:", existingPage);
    } catch (err) {
      console.error("❌ Failed to fetch existing page", err);
      return NextResponse.json(
        { error: "Failed to fetch page" },
        { status: 500 },
      );
    }

    if (!existingPage) {
      console.error("❌ Page not found for ID:", id);
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    /* -------------------- Immutable field protection -------------------- */
    if (slug && slug !== existingPage.slug) {
      console.error(
        "❌ Slug modification attempt:",
        "existing:",
        existingPage.slug,
        "incoming:",
        slug,
      );
      return NextResponse.json(
        { error: "Slug cannot be modified" },
        { status: 400 },
      );
    }

    /* -------------------- Update document -------------------- */
    const updateDoc = {
      name,
      route,
      status: status ?? existingPage.status,
      seo: {
        title: seo?.title ?? null,
        description: seo?.description ?? null,
      },
      component_data,
      updatedAt: new Date(),
      version: (existingPage.version ?? 0) + 1,
    };

    console.log("📝 Update document:", JSON.stringify(updateDoc, null, 2));

    /* -------------------- Mongo update -------------------- */
    let result;
    try {
      result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateDoc },
        { returnDocument: "after" },
      );
      console.log("📬 Mongo update result:", result);
    } catch (err) {
      console.error("❌ Mongo findOneAndUpdate failed", err);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 },
      );
    }

    if (!result) {
      console.error("❌ Update returned no document");
      return NextResponse.json(
        { error: "Failed to update page" },
        { status: 500 },
      );
    }
    /* -------------------- revalidate pages -------------------- */
    revalidateTag(CACHE_TAGS.PAGES, { expire: 0 });
    console.log("✅ Page updated successfully:", result);

    /* -------------------- Response -------------------- */

    return NextResponse.json({
      ...result,
      _id: result._id.toString(),
    });
  } catch (err) {
    console.error("🔥 Uncaught PUT handler error", err);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 },
    );
  }
}
